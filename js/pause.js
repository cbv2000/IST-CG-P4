import './three.js';

export default class Pause extends THREE.Mesh {
	constructor(x, y, z) {
		let mat = new THREE.MeshBasicMaterial({
			map: new THREE.TextureLoader().load('../assets/pause.png'),
			transparent: true,
			opacity: 1,
		});
		let geo = new THREE.CubeGeometry(31, 20, 1);
		super(geo, mat);

		//camera.add(this);
		this.position.set(x, y, z);
		this.visible = false;
	}
}
