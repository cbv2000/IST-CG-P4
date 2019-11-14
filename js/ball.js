import './three.js';

export default class Ball extends THREE.Mesh {
	constructor(x, y, z, size) {
		const lisa = new THREE.TextureLoader().load('../assets/mona_lisa.jpg');

		let geo = new THREE.SphereGeometry(size, 2 * Math.PI * size, 2 * Math.PI * size);
		let material = new THREE.MeshPhongMaterial({
			map: lisa,
		});

		super(geo, material);
		this.material = material;
		this.size = size;

		this.position.set(x, y, z);
		this.rotateY(-Math.PI / 2);
	}
}
