// Enhanced Three.js scene setup
const scene = new THREE.Scene();

// Renderer with enhanced settings
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
  alpha: true,
  antialias: true,
  powerPreference: "high-performance"
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

// Camera with enhanced settings
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
camera.position.set(0, 0, 10);

// Enhanced lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

const pointLight1 = new THREE.PointLight(0x00abf0, 1, 100);
pointLight1.position.set(10, 10, 10);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x64ffda, 1, 100);
pointLight2.position.set(-10, -10, -10);
scene.add(pointLight2);

// Create enhanced floating particles
const particlesGeometry = new THREE.BufferGeometry();
const particlesCount = 5000;

const posArray = new Float32Array(particlesCount * 3);
const colorArray = new Float32Array(particlesCount * 3);

for(let i = 0; i < particlesCount * 3; i++) {
    // Position particles in a spherical distribution
    const radius = 50 + Math.random() * 100;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    posArray[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
    posArray[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    posArray[i * 3 + 2] = radius * Math.cos(phi);
    
    // Color particles with a gradient
    colorArray[i * 3] = 0.2 + Math.random() * 0.8; // R
    colorArray[i * 3 + 1] = 0.7 + Math.random() * 0.3; // G
    colorArray[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
particlesGeometry.setAttribute('color', new THREE.BufferAttribute(colorArray, 3));

const particlesMaterial = new THREE.PointsMaterial({
    size: 0.15,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true
});

const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particlesMesh);

// Create geometric shapes with enhanced materials
const shapes = [];

// Create torus knots with enhanced materials
for(let i = 0; i < 15; i++) {
    const geometry = new THREE.TorusKnotGeometry(1, 0.4, 128, 32);
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(Math.random() * 0.5 + 0.5, Math.random() * 0.5 + 0.5, 1),
        metalness: 0.7,
        roughness: 0.3,
        transparent: true,
        opacity: 0.8,
        wireframe: Math.random() > 0.5
    });
    
    const torusKnot = new THREE.Mesh(geometry, material);
    torusKnot.castShadow = true;
    torusKnot.receiveShadow = true;
    
    // Position in a spiral pattern
    const angle = (i / 15) * Math.PI * 4;
    const radius = 30 + (i % 5) * 10;
    torusKnot.position.set(
        Math.cos(angle) * radius,
        (i % 7) * 5 - 15,
        Math.sin(angle) * radius
    );
    
    // Random rotation
    torusKnot.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    
    // Random scale
    const scale = 0.5 + Math.random() * 2;
    torusKnot.scale.set(scale, scale, scale);
    
    scene.add(torusKnot);
    shapes.push(torusKnot);
}

// Create icosahedrons with enhanced materials
for(let i = 0; i < 15; i++) {
    const geometry = new THREE.IcosahedronGeometry(1, 1);
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0.5 + Math.random() * 0.5, 1, 0.5 + Math.random() * 0.5),
        metalness: 0.5,
        roughness: 0.5,
        transparent: true,
        opacity: 0.8,
        wireframe: Math.random() > 0.5
    });
    
    const icosahedron = new THREE.Mesh(geometry, material);
    icosahedron.castShadow = true;
    icosahedron.receiveShadow = true;
    
    // Position in a spherical distribution
    const radius = 40 + (i % 5) * 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    
    icosahedron.position.set(
        radius * Math.sin(phi) * Math.cos(theta),
        radius * Math.sin(phi) * Math.sin(theta),
        radius * Math.cos(phi)
    );
    
    // Random rotation
    icosahedron.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    
    // Random scale
    const scale = 0.8 + Math.random() * 2;
    icosahedron.scale.set(scale, scale, scale);
    
    scene.add(icosahedron);
    shapes.push(icosahedron);
}

 // Create octahedrons
for(let i = 0; i < 10; i++) {
    const geometry = new THREE.OctahedronGeometry(1, 0);
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(1, 0.5 + Math.random() * 0.5, 0.5 + Math.random() * 0.5),
        metalness: 0.3,
        roughness: 0.7,
        transparent: true,
        opacity: 0.8,
        wireframe: Math.random() > 0.5
    });
    
    const octahedron = new THREE.Mesh(geometry, material);
    octahedron.castShadow = true;
    octahedron.receiveShadow = true;
    
    // Position randomly
    octahedron.position.set(
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100,
        (Math.random() - 0.5) * 100
    );
    
    // Random rotation
    octahedron.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    
    // Random scale
    const scale = 1 + Math.random() * 2;
    octahedron.scale.set(scale, scale, scale);
    
    // Velocity for space movement
    octahedron.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2,
        (Math.random() - 0.5) * 0.2
    );
    
    scene.add(octahedron);
    shapes.push(octahedron);
}

// Create dodecahedrons
for(let i = 0; i < 10; i++) {
    const geometry = new THREE.DodecahedronGeometry(2, 0);
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(Math.random(), Math.random(), Math.random()),
        metalness: 0.5,
        roughness: 0.4,
        transparent: true,
        opacity: 0.8,
        wireframe: Math.random() > 0.7
    });
    
    const dodecahedron = new THREE.Mesh(geometry, material);
    dodecahedron.castShadow = true;
    dodecahedron.receiveShadow = true;
    
    // Position randomly in space
    dodecahedron.position.set(
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 150,
        (Math.random() - 0.5) * 150
    );
    
    // Random rotation
    dodecahedron.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
    );
    
    // Random scale
    const scale = 0.5 + Math.random() * 1.5;
    dodecahedron.scale.set(scale, scale, scale);
    
    // Velocity for space movement
    dodecahedron.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3
    );
    
    scene.add(dodecahedron);
    shapes.push(dodecahedron);
}

 // Create cylinders
for(let i = 0; i < 8; i++) {
    const geometry = new THREE.CylinderGeometry(0.5, 1, 3, 32);
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0.8, 0.2 + Math.random() * 0.6, 0.8),
        metalness: 0.6,
        roughness: 0.3,
        transparent: true,
        opacity: 0.9
    });
    
    const cylinder = new THREE.Mesh(geometry, material);
    cylinder.castShadow = true;
    cylinder.receiveShadow = true;
    
    // Position randomly
    cylinder.position.set(
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 120,
        (Math.random() - 0.5) * 120
    );
    
    // Random rotation
    cylinder.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    
    // Random scale
    const scale = 0.8 + Math.random() * 1.2;
    cylinder.scale.set(scale, scale, scale);
    
    // Velocity for space movement
    cylinder.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.5) * 0.25,
        (Math.random() - 0.5) * 0.25
    );
    
    scene.add(cylinder);
    shapes.push(cylinder);
}

// Create tetrahedrons
for(let i = 0; i < 12; i++) {
    const geometry = new THREE.TetrahedronGeometry(1.5, 0);
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0.3 + Math.random() * 0.7, 0.3 + Math.random() * 0.7, 1),
        metalness: 0.4,
        roughness: 0.5,
        transparent: true,
        opacity: 0.8,
        wireframe: Math.random() > 0.6
    });
    
    const tetrahedron = new THREE.Mesh(geometry, material);
    tetrahedron.castShadow = true;
    tetrahedron.receiveShadow = true;
    
    // Position randomly in space
    tetrahedron.position.set(
        (Math.random() - 0.5) * 130,
        (Math.random() - 0.5) * 130,
        (Math.random() - 0.5) * 130
    );
    
    // Random rotation
    tetrahedron.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2
    );
    
    // Random scale
    const scale = 0.6 + Math.random() * 1.4;
    tetrahedron.scale.set(scale, scale, scale);
    
    // Velocity for space movement
    tetrahedron.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.35,
        (Math.random() - 0.5) * 0.35,
        (Math.random() - 0.5) * 0.35
    );
    
    scene.add(tetrahedron);
    shapes.push(tetrahedron);
}

// Create boxes (cubes)
for(let i = 0; i < 10; i++) {
    const geometry = new THREE.BoxGeometry(2, 2, 2);
    const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(Math.random() * 0.5 + 0.5, Math.random(), 0.5 + Math.random() * 0.5),
        metalness: 0.8,
        roughness: 0.2,
        transparent: true,
        opacity: 0.7
    });
    
    const box = new THREE.Mesh(geometry, material);
    box.castShadow = true;
    box.receiveShadow = true;
    
    // Position randomly
    box.position.set(
        (Math.random() - 0.5) * 140,
        (Math.random() - 0.5) * 140,
        (Math.random() - 0.5) * 140
    );
    
    // Random rotation
    box.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
    );
    
    // Random scale
    const scale = 0.7 + Math.random() * 1.3;
    box.scale.set(scale, scale, scale);
    
    // Velocity for space movement
    box.userData.velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3
    );
    
    scene.add(box);
    shapes.push(box);
}

// Create a central core
const coreGeometry = new THREE.SphereGeometry(5, 32, 32);
const coreMaterial = new THREE.MeshStandardMaterial({
    color: new THREE.Color(0.2, 0.8, 1),
    metalness: 0.9,
    roughness: 0.1,
    transparent: true,
    opacity: 0.7,
    emissive: new THREE.Color(0.1, 0.5, 0.8),
    emissiveIntensity: 0.5
});
const core = new THREE.Mesh(coreGeometry, coreMaterial);
core.castShadow = true;
core.receiveShadow = true;
scene.add(core);
shapes.push(core);

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Mouse movement for parallax effect
let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;
const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX - windowHalfX) / 100;
    mouseY = (event.clientY - windowHalfY) / 100;
});

// Touch movement for mobile
document.addEventListener('touchmove', (event) => {
    if (event.touches.length === 1) {
        event.preventDefault();
        mouseX = (event.touches[0].pageX - windowHalfX) / 100;
        mouseY = (event.touches[0].pageY - windowHalfY) / 100;
    }
}, { passive: false });

// Scroll-based particle interaction
let scrollY = 0;
window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
});

 // Animation loop with enhanced effects
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    const elapsedTime = clock.getElapsedTime();
    const deltaTime = clock.getDelta();

    // Smooth out the mouse movement
    targetX = mouseX * 0.001;
    targetY = mouseY * 0.001;

    // Keyboard camera controls
    const moveSpeed = 0.5;
    if (keys['KeyW'] || keys['ArrowUp']) camera.position.z -= moveSpeed;
    if (keys['KeyS'] || keys['ArrowDown']) camera.position.z += moveSpeed;
    if (keys['KeyA'] || keys['ArrowLeft']) camera.position.x -= moveSpeed;
    if (keys['KeyD'] || keys['ArrowRight']) camera.position.x += moveSpeed;
    if (keys['KeyQ']) camera.position.y += moveSpeed;
    if (keys['KeyE']) camera.position.y -= moveSpeed;

    // Rotate particles with scroll effect
    particlesMesh.rotation.x = elapsedTime * 0.02 + scrollY * 0.0001;
    particlesMesh.rotation.y = elapsedTime * 0.01 + targetX * 2;

    // Animate shapes with space movement
    shapes.forEach((shape, index) => {
        // Pulsing scale
        const scale = 0.8 + Math.sin(elapsedTime * 0.5 + index) * 0.2;
        shape.scale.set(scale, scale, scale);

        // Rotation
        shape.rotation.x += 0.005 * (index % 3 + 1) + (shape.userData.spinSpeed || 0);
        shape.rotation.y += 0.007 * (index % 2 + 1) + (shape.userData.spinSpeed || 0);
        shape.rotation.z += 0.003 * (index % 4 + 1) + (shape.userData.spinSpeed || 0);

        // Velocity-based movement in space
        if (shape.userData.velocity) {
            shape.position.add(shape.userData.velocity);

            // Bounce off boundaries for space-like movement
            const bounds = 100;
            if (Math.abs(shape.position.x) > bounds) shape.userData.velocity.x *= -1;
            if (Math.abs(shape.position.y) > bounds) shape.userData.velocity.y *= -1;
            if (Math.abs(shape.position.z) > bounds) shape.userData.velocity.z *= -1;
        }

        // Cursor reactivity
        const mouseInfluence = 0.02;
        shape.position.x += (targetX * 20 - shape.position.x) * mouseInfluence;
        shape.position.z += (targetY * 20 - shape.position.z) * mouseInfluence;
    });

    // Burst particle animation
    if (burstActive) {
        burstTime += deltaTime;
        const positions = burstParticlesGeometry.attributes.position.array;
        const colors = burstParticlesGeometry.attributes.color.array;

        for (let i = 0; i < burstParticlesCount; i++) {
            const angle = (i / burstParticlesCount) * Math.PI * 2;
            const radius = burstTime * 20;
            const height = Math.sin(burstTime * 5 + i * 0.1) * 5;

            positions[i * 3] = burstPosition.x + Math.cos(angle) * radius;
            positions[i * 3 + 1] = burstPosition.y + height;
            positions[i * 3 + 2] = burstPosition.z + Math.sin(angle) * radius;

            // Fade out over time
            colors[i * 3 + 3] = Math.max(0, 1 - burstTime * 2); // Alpha
        }

        burstParticlesGeometry.attributes.position.needsUpdate = true;
        burstParticlesGeometry.attributes.color.needsUpdate = true;

        if (burstTime > 2) {
            burstActive = false;
            // Reset positions
            for (let i = 0; i < burstParticlesCount; i++) {
                positions[i * 3] = 0;
                positions[i * 3 + 1] = 0;
                positions[i * 3 + 2] = 0;
            }
            burstParticlesGeometry.attributes.position.needsUpdate = true;
        }
    }

    // Dynamic lighting based on mouse
    pointLight1.position.x = mouseX * 2;
    pointLight1.position.y = mouseY * 2;
    pointLight2.position.x = -mouseX * 2;
    pointLight2.position.y = -mouseY * 2;

    // Enhanced parallax effect
    camera.position.x += (targetX - camera.position.x) * 0.1;
    camera.position.y += (-targetY - camera.position.y) * 0.1;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

// Start animation
animate();

// Enhanced interactive features
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
let selectedShape = null;
let isHovering = false;

// Particle burst system
const burstParticlesGeometry = new THREE.BufferGeometry();
const burstParticlesCount = 100;
const burstPosArray = new Float32Array(burstParticlesCount * 3);
const burstColorArray = new Float32Array(burstParticlesCount * 3);

for(let i = 0; i < burstParticlesCount; i++) {
    burstPosArray[i * 3] = 0;
    burstPosArray[i * 3 + 1] = 0;
    burstPosArray[i * 3 + 2] = 0;
    burstColorArray[i * 3] = Math.random();
    burstColorArray[i * 3 + 1] = Math.random();
    burstColorArray[i * 3 + 2] = Math.random();
}

burstParticlesGeometry.setAttribute('position', new THREE.BufferAttribute(burstPosArray, 3));
burstParticlesGeometry.setAttribute('color', new THREE.BufferAttribute(burstColorArray, 3));

const burstParticlesMaterial = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.8
});

const burstParticlesMesh = new THREE.Points(burstParticlesGeometry, burstParticlesMaterial);
scene.add(burstParticlesMesh);

// Burst animation variables
let burstActive = false;
let burstTime = 0;
let burstPosition = new THREE.Vector3();

// Keyboard controls
const keys = {};
document.addEventListener('keydown', (event) => {
    keys[event.code] = true;
});

document.addEventListener('keyup', (event) => {
    keys[event.code] = false;
});

// Click interaction
function onMouseClick(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(shapes);

    if (intersects.length > 0) {
        const clickedShape = intersects[0].object;

        // Trigger burst effect
        burstPosition.copy(clickedShape.position);
        burstActive = true;
        burstTime = 0;

        // Change shape color and behavior
        clickedShape.material.emissive.setHex(Math.random() * 0xffffff);
        clickedShape.material.emissiveIntensity = 0.5;

        // Add spin animation
        clickedShape.userData.spinSpeed = (Math.random() - 0.5) * 0.1;

        // Reset after 2 seconds
        setTimeout(() => {
            clickedShape.material.emissive.setHex(0x000000);
            clickedShape.material.emissiveIntensity = 0;
            clickedShape.userData.spinSpeed = 0;
        }, 2000);
    }
}

window.addEventListener('click', onMouseClick, false);

// Mouse move for hover and particle interaction
function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    // Shape hover detection
    const shapeIntersects = raycaster.intersectObjects(shapes);
    if (shapeIntersects.length > 0) {
        if (!isHovering) {
            selectedShape = shapeIntersects[0].object;
            selectedShape.material.emissive.setHex(0x444444);
            selectedShape.material.emissiveIntensity = 0.3;
            isHovering = true;
            document.body.style.cursor = 'pointer';
        }
    } else {
        if (isHovering && selectedShape) {
            selectedShape.material.emissive.setHex(0x000000);
            selectedShape.material.emissiveIntensity = 0;
            isHovering = false;
            document.body.style.cursor = 'default';
        }
    }

    // Particle interaction
    const particleIntersects = raycaster.intersectObject(particlesMesh);

    if (particleIntersects.length > 0) {
        const index = particleIntersects[0].index;
        const positions = particlesGeometry.attributes.position.array;
        const colors = particlesGeometry.attributes.color.array;

        for (let i = 0; i < particlesCount; i++) {
            const dx = positions[i * 3] - positions[index * 3];
            const dy = positions[i * 3 + 1] - positions[index * 3 + 1];
            const dz = positions[i * 3 + 2] - positions[index * 3 + 2];
            const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (distance < 5) {
                colors[i * 3] = 1;
                colors[i * 3 + 1] = 1;
                colors[i * 3 + 2] = 1;
            } else if (distance < 10) {
                colors[i * 3] = Math.min(1, colors[i * 3] + 0.3);
                colors[i * 3 + 1] = Math.min(1, colors[i * 3 + 1] + 0.3);
                colors[i * 3 + 2] = Math.min(1, colors[i * 3 + 2] + 0.3);
            }
        }

        particlesGeometry.attributes.color.needsUpdate = true;
    }
}

window.addEventListener('mousemove', onMouseMove, false);
