import './three.js';

export default class Board extends THREE.Mesh {
	constructor(x, y, z, size) {
		/* Textures */
		let bmap = new THREE.TextureLoader().load('../assets/wood_bump.jpg');
		let smap = new THREE.TextureLoader().load('../assets/grid_withborder.png');

		let geo = new THREE.CubeGeometry(size, size / 10, size, size, size / 10, size);
		let material = new THREE.MeshPhongMaterial({
			color: 0x4a2f00,
			bumpMap: bmap,
			map: smap,
			bumpScale: 0.9,
			wireframe: false,
		});

		super(geo, material);
		this.material = material;
		this.size = size;
		this.texture = smap;
		this.bmap = bmap;

		this.position.set(x, y, z);
	}

	changeMaterial(material) {
		let mat = material.clone();
		mat.color = new THREE.Color(0x4a2f00);
		mat.map = this.texture;
		mat.wireframe = this.material.wireframe;

		if (material.type != 'MeshBasicMaterial') {
			mat.bumpMap = this.bmap;
			mat.bumpScale = 0.9;
		}

		this.material = mat;
	}

	toggleWireframe(state = !this.material.wireframe) {
		this.material.wireframe = state;
	}
}
