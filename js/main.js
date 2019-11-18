import './three.js';
import Board from './board.js';
import Ball from './ball.js';
import Dice from './dice.js';

var renderer = null;
var scene = null;
var keys = {};
var lastTimestamp = 0;

var cameras = [];
var camera = null;

var materials = [];
var material = null;

var dirLight = null;
var pointLight = null;

var board = null;
var dice = null;
var ball = null;
var ballSun = null;

function init() {
	renderer = new THREE.WebGLRenderer({
		antialias: true,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);
	addScene();

	materials[0] = new THREE.MeshBasicMaterial();
	materials[1] = new THREE.MeshPhongMaterial();
	material = materials[1];

	cameras[0] = addCamera(0, 20, 20, 1); // pespective camera
	cameras[1] = addCamera(0, 30, 0, 0); // ortogonal camera
	camera = cameras[0];

	cameras[0].lookAt(scene.position);
	cameras[1].lookAt(scene.position);
	camera.updateProjectionMatrix();
	updateCameras();

	board = new Board(0, -1.5, 0, 30);
	dice = new Dice(0, 4 * Math.sqrt(3 / 4), 0, 4);
	scene.add(board);
	scene.add(dice);

	ballSun = new THREE.Object3D();
	scene.add(ballSun);
	ball = new Ball(10, 2, 0, 2);
	ballSun.add(ball);

	addDirLight();
	addPointLight();

	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('keyup', onKeyUp);
	window.addEventListener('resize', onResize);

	animate(lastTimestamp);
}

//////////// ADD FUNCTIONS ////////////

function addPointLight() {
	pointLight = new THREE.PointLight(0xffffff, 5, board.size * Math.sqrt(2));
	pointLight.position.set((2 * board.size) / 5, 1, (2 * board.size) / 5);
	scene.add(pointLight);
}

function addDirLight() {
	dirLight = new THREE.DirectionalLight(0xffffff, 2);
	let pos = cameras[0].position;
	dirLight.position.set(pos.x, pos.y, pos.z);
	scene.add(dirLight);
}

function addCamera(x, y, z, type) {
	let camera;
	if (type === 0) {
		camera = new THREE.OrthographicCamera();
		camera.near = -200;
		camera.far = 500;
	} else if (type === 1) {
		camera = new THREE.PerspectiveCamera();
		camera.fov = 70;
		camera.near = 1;
		camera.far = 1000;
	}

	camera.position.set(x, y, z);
	camera.lookAt(scene.position);
	return camera;
}

function addScene() {
	scene = new THREE.Scene();
	scene.add(new THREE.AxesHelper(20));
}

//////////// UPDATE FUNCTIONS ////////////

function updateCameras() {
	// Update ortographic camera
	const min_width = 100 * 2;
	const min_height = 100;

	// Calculate new possible values of width and height
	let height = (window.innerHeight / window.innerWidth) * min_height;
	let width = (window.innerWidth / window.innerHeight) * min_width;

	// Height doesn't fit the screen
	if (height < min_height) {
		height = min_height; // Lock height
		width = (window.innerWidth / window.innerHeight) * height; // Adjust width
	}

	// Width doesn't fit the screen
	if (width < min_width) {
		width = min_width; // Lock width
		height = (window.innerHeight / window.innerWidth) * width; // Adjust height
	}

	Object.assign(cameras[0], {
		left: -width / 2,
		right: width / 2,
		top: height / 2,
		bottom: -height / 2,
	});

	// Update perspective camera

	const new_ar = window.innerWidth / window.innerHeight;
	cameras[0].aspect = new_ar;

	cameras.forEach(camera => camera.updateProjectionMatrix());
}

function onResize() {
	renderer.setSize(window.innerWidth, window.innerHeight);
	updateCameras();
}

function onKeyUp(e) {
	keys[e.keyCode] = false;
}

function onKeyDown(e) {
	keys[e.keyCode] = true;

	switch (e.keyCode) {
		case 68: // D
			dirLight.visible = !dirLight.visible;
			break;
		case 80: // P
			pointLight.visible = !pointLight.visible;
			break;
		case 76: // L
			material = materials[(materials.indexOf(material) + 1) % 2];
			break;
		case 87: // W
			break;
	}
}

function render() {
	renderer.render(scene, camera);
}

function update(delta) {
	// Movement & Rotations
	dice.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), -delta);
	ball.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), delta);
	ballSun.rotateY(delta);

	// Materials
	if (keys[76]) {
		keys[76] = false;
		dice.changeMaterial(material);
		ball.changeMaterial(material);
		board.changeMaterial(material);
	}

	if (keys[87]) {
		keys[87] = false;
		board.toggleWireframe();
		dice.toggleWireframe();
		ball.toggleWireframe();
	}
}

function animate(ts) {
	let delta = (ts - lastTimestamp) / 1000;
	lastTimestamp = ts;

	update(delta);
	render();

	requestAnimationFrame(animate);
}

init();
