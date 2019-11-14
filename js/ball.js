import './three.js';

export default class Ball extends THREE.Mesh {
	constructor(x, y, z, size) {
		let texture = new THREE.TextureLoader().load('../assets/mona_lisa.jpg');

		let geo = new THREE.SphereGeometry(size, 2 * Math.PI * size, 2 * Math.PI * size);
		let material = new THREE.MeshPhongMaterial({
			map: texture,
			wireframe: false,
		});

		super(geo, material);
		this.material = material;
		this.size = size;
		this.texture = texture;

		this.position.set(x, y, z);
		this.rotateY(-Math.PI / 2);
	}

	changeMaterial(material) {
		let mat = material.clone();
		mat.map = this.texture;
		mat.wireframe = this.material.wireframe;
		this.material = mat;
	}

	toggleWireframe(state = !this.material.wireframe) {
		this.material.wireframe = state;
	}
}
