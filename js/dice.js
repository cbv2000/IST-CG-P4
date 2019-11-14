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

export default class Dice extends THREE.Mesh {
	constructor(x, y, z, size) {
		let material = texture =>
			new THREE.MeshPhongMaterial({
				color: 0xffffff,
				map: new THREE.TextureLoader().load(texture),
				bumpMap: new THREE.TextureLoader().load(texture),
				bumpScale: 0.45,
			});

		// let geo = createBoxWithRoundedEdges(size, size, size, 0.4, size);
		let geo = new THREE.BoxGeometry(size, size, size, 100, 100, 100);
		let materials = [
			material('../assets/dice-n1.png'),
			material('../assets/dice-n5.png'),
			material('../assets/dice-n2.png'),
			material('../assets/dice-n6.png'),
			material('../assets/dice-n3.png'),
			material('../assets/dice-n4.png'),
		];

		super(geo, materials);
		this.position.set(x, y, z);

		this.add(new THREE.AxesHelper(5));

		this.rotateOnAxis(new THREE.Vector3(1, 0, 1), Math.atan(1 / Math.sqrt(2)));
	}
}
