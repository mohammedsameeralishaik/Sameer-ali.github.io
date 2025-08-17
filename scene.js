// Basic Three.js scene setup
const scene = new THREE.Scene();

// Loading Manager
const loadingManager = new THREE.LoadingManager();
const loadingScreen = document.getElementById('loading-screen');
loadingManager.onLoad = () => {
    loadingScreen.style.display = 'none';
};

// Skybox
const loader = new THREE.CubeTextureLoader(loadingManager);
const texture = loader.load([
    'https://raw.githack.com/codypearce/some-skyboxes/master/skyboxes/purplenebula/purplenebula_ft.png',
    'https://raw.githack.com/codypearce/some-skyboxes/master/skyboxes/purplenebula/purplenebula_bk.png',
    'https://raw.githack.com/codypearce/some-skyboxes/master/skyboxes/purplenebula/purplenebula_up.png',
    'https://raw.githack.com/codypearce/some-skyboxes/master/skyboxes/purplenebula/purplenebula_dn.png',
    'https://raw.githack.com/codypearce/some-skyboxes/master/skyboxes/purplenebula/purplenebula_rt.png',
    'https://raw.githack.com/codypearce/some-skyboxes/master/skyboxes/purplenebula/purplenebula_lf.png',
]);
scene.background = texture;

// Fog
scene.fog = new THREE.Fog(0x081b29, 0, 75);


// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5); // Position the camera

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true, // Make canvas transparent
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 5, 5);
scene.add(pointLight);

// Floor
const floorGeometry = new THREE.PlaneGeometry(100, 100);
const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x112e42, // Match the --second-bg-color
    side: THREE.DoubleSide
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2; // Rotate it to be horizontal
scene.add(floor);

// Portfolio Sections
const sections = [
    { id: 'skills', position: new THREE.Vector3(-10, 2, -10) },
    { id: 'experience', position: new THREE.Vector3(-5, 2, -12) },
    { id: 'portfolio', position: new THREE.Vector3(5, 2, -12) },
    { id: 'certification', position: new THREE.Vector3(10, 2, -10) },
    { id: 'contact', position: new THREE.Vector3(0, 2, -15) }
];

const monolithGeometry = new THREE.BoxGeometry(2, 4, 0.5);
const monolithMaterial = new THREE.MeshStandardMaterial({
    color: 0x00abf0, // --main-color
    metalness: 0.5,
    roughness: 0.5
});

sections.forEach(section => {
    const monolith = new THREE.Mesh(monolithGeometry, monolithMaterial);
    monolith.position.copy(section.position);
    monolith.userData.id = section.id;
    monolith.lookAt(camera.position); // Make monoliths face the starting camera position
    scene.add(monolith);
});


// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Controls
const controls = new THREE.PointerLockControls(camera, renderer.domElement);
scene.add(controls.getObject());

const instructions = document.createElement('div');
instructions.innerHTML = 'Click to play!';
instructions.style.position = 'absolute';
instructions.style.top = '50%';
instructions.style.left = '50%';
instructions.style.transform = 'translate(-50%, -50%)';
instructions.style.fontSize = '24px';
instructions.style.color = 'white';
instructions.style.cursor = 'pointer';
document.body.appendChild(instructions);

instructions.addEventListener('click', () => {
    controls.lock();
});

controls.addEventListener('lock', () => {
    instructions.style.display = 'none';
});

controls.addEventListener('unlock', () => {
    instructions.style.display = 'block';
});


// Movement
let moveForward = false;
let moveBackward = false;
let moveLeft = false;
let moveRight = false;
const velocity = new THREE.Vector3();
const direction = new THREE.Vector3();

const onKeyDown = (event) => {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = true;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = true;
            break;
        case 'ArrowDown':
        case 'KeyS':
            moveBackward = true;
            break;
        case 'ArrowRight':
        case 'KeyD':
            moveRight = true;
            break;
    }
};

const onKeyUp = (event) => {
    switch (event.code) {
        case 'ArrowUp':
        case 'KeyW':
            moveForward = false;
            break;
        case 'ArrowLeft':
        case 'KeyA':
            moveLeft = false;
            break;
        case 'ArrowDown':
        case 'KeyS':
            moveBackward = false;
            break;
        case 'ArrowRight':
        case 'KeyD':
            moveRight = false;
            break;
    }
};

document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

// Animation loop
const clock = new THREE.Clock();
function animate() {
  requestAnimationFrame(animate);

  const delta = clock.getDelta();

  if (controls.isLocked === true) {
    velocity.x -= velocity.x * 10.0 * delta;
    velocity.z -= velocity.z * 10.0 * delta;

    direction.z = Number(moveForward) - Number(moveBackward);
    direction.x = Number(moveRight) - Number(moveLeft);
    direction.normalize(); // this ensures consistent movements in all directions

    if (moveForward || moveBackward) velocity.z -= direction.z * 40.0 * delta;
    if (moveLeft || moveRight) velocity.x -= direction.x * 40.0 * delta;

    controls.moveRight(-velocity.x * delta);
    controls.moveForward(-velocity.z * delta);
  }

  // Interactive Zones
  let inZone = false;
  let activeSectionId = null;

  sections.forEach(section => {
      const monolith = scene.getObjectByProperty('userData', {id: section.id});
      const distance = camera.position.distanceTo(monolith.position);

      if (distance < 5) { // Zone radius
          inZone = true;
          activeSectionId = section.id;
      }
  });

  const allSections = document.querySelectorAll('section');
  if (inZone) {
      allSections.forEach(sec => {
          if (sec.id === activeSectionId) {
              sec.classList.add('active-section');
          } else {
              sec.classList.remove('active-section');
          }
      });
  } else {
      allSections.forEach(sec => {
        if(sec.id !== 'home') {
            sec.classList.remove('active-section');
        } else {
            sec.classList.add('active-section');
        }
      });
  }

  renderer.render(scene, camera);
}

animate();
