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

		this.speed = 0;
		this.sun = null;
	}

	addSun() {
		this.sun = new THREE.Object3D();
		this.sun.add(this);
		return this.sun;
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

	updateMovement(delta) {
		this.rotateOnWorldAxis(new THREE.Vector3(0, 1, 0), delta * this.speed);
		this.sun.rotateY(delta * this.speed);
	}
}
