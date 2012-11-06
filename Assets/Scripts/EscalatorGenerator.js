#pragma strict

var prefabs : GameObject[];
var radius = 5.0;
var interval = 1.0;
var ratio = 0.2;
var altMode = false;

function Start() {
	while (true) {
		var phi = (Random.value * 0.6 - 0.3) * Mathf.PI;
		var pos = Vector3(Mathf.Sin(phi), 0.0, Mathf.Cos(phi));
		if (!altMode) {
			var prefab = prefabs[Random.value < ratio ? 0 : 1];
		} else {
			prefab = prefabs[pos.x < 0.0 ? 1 : 0];
		}
		var instance = Instantiate(prefab, pos * radius, Quaternion.identity) as GameObject;
		yield WaitForSeconds(interval);
	}
}
