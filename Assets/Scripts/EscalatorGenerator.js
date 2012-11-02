#pragma strict

var prefab : GameObject;
var radius = 5.0;
var interval = 1.0;

function Start() {
	while (true) {
		var phi = Random.value * Mathf.PI * 2;
		var pos = Vector3(Mathf.Sin(phi), 0.0, Mathf.Cos(phi));
		var instance = Instantiate(prefab, pos * radius, Quaternion.identity) as GameObject;
		instance.GetComponent.<EscalatorAI>().fastForward = (Random.value < EscalatorConfig.instance.fastForwardRatio);
		yield WaitForSeconds(interval);
	}
}
