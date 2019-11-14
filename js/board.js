import './three.js';

export default class Board extends THREE.Mesh {
	constructor(x, y, z, size) {
		/* Textures */
		const bmap = new THREE.TextureLoader().load('../assets/wood_bump.jpg');
		var smap = new THREE.TextureLoader().load('../assets/grid_withborder.png');

		let geo = new THREE.CubeGeometry(size, size / 10, size, size, size / 10, size);
		let material = new THREE.MeshPhongMaterial({
			color: 0x4a2f00,
			bumpMap: bmap,
			map: smap,
			bumpScale: 0.45,
			wireframe: false,
		});

		super(geo, material);
		this.material = material;
		this.size = size;

		this.position.set(x, y, z);
	}
}
