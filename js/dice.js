import './three.js';

// https://discourse.threejs.org/t/round-edged-box/1402
function createBoxWithRoundedEdges(width, height, depth, radius0, smoothness) {
	let shape = new THREE.Shape();
	let eps = 0.00001;
	let radius = radius0 - eps;
	shape.absarc(eps, eps, eps, -Math.PI / 2, -Math.PI, true);
	shape.absarc(eps, height - radius * 2, eps, Math.PI, Math.PI / 2, true);
	shape.absarc(width - radius * 2, height - radius * 2, eps, Math.PI / 2, 0, true);
	shape.absarc(width - radius * 2, eps, eps, 0, -Math.PI / 2, true);
	let geometry = new THREE.ExtrudeBufferGeometry(shape, {
		amount: depth - radius0 * 2,
		bevelEnabled: true,
		bevelSegments: smoothness * 2,
		steps: 1,
		bevelSize: radius,
		bevelThickness: radius0,
		curveSegments: smoothness,
	});

	geometry.center();

	return geometry;
}
let first = true;
export default class Dice extends THREE.Mesh {
	constructor(x, y, z, size) {
		let textures = [
			'../assets/dice-n1.png',
			'../assets/dice-n5.png',
			'../assets/dice-n2.png',
			'../assets/dice-n6.png',
			'../assets/dice-n3.png',
			'../assets/dice-n4.png',
		];

		// let geo = createBoxWithRoundedEdges(size, size, size, 0.4, size);
		let geo = new THREE.CubeGeometry(size, size, size, size, size, size);
		let basic = textures.map(
			t =>
				new THREE.MeshBasicMaterial({
					map: new THREE.TextureLoader().load(t),
					color: 0xffffff,
					wireframe: false,
				})
		);
		let phong = textures.map(
			t =>
				new THREE.MeshPhongMaterial({
					map: new THREE.TextureLoader().load(t),
					bumpMap: new THREE.TextureLoader().load(t),
					color: 0xffffff,
					bumpScale: 0.3,
					wireframe: false,
				})
		);

		super(geo, phong);
		this.textures = textures;
		this.phong = phong;
		this.basic = basic;

		this.position.set(x, y, z);

		this.add(new THREE.AxesHelper(5));

		this.rotateX(Math.PI / 4);
		this.rotateOnWorldAxis(new THREE.Vector3(0, 0, 1), Math.atan(1 / Math.sqrt(2)));
	}

	changeMaterial(material) {
		this.material = material.type == 'MeshPhongMaterial' ? this.phong : this.basic;
	}

	toggleWireframe(state = !this.material[0].wireframe) {
		for (let i = 0; i < this.textures.length; i++) {
			this.phong[i].wireframe = state;
			this.basic[i].wireframe = state;
			this.material[i].wireframe = state;
		}
	}
}
