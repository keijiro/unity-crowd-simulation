#pragma strict

var layerMask : LayerMask;
var interval = 0.8;
var speed = 0.8;
var multiplier = 2.0;
var radius = 0.2;
var fastForward = false;

function Start() {
	var target = transform.Find("Target").position;

	while (true) {
		while (true) {
			var colliders = Physics.OverlapSphere(transform.position, radius, layerMask);
			if (colliders && colliders.Length > 0) break;
			yield;
		}

		var ai = colliders[0].GetComponent.<EscalatorAI>();

		if (fastForward) {
			ai.RideOnEscalator(transform.position, target, speed * multiplier, 1.0);
			yield WaitForSeconds(interval / multiplier);

		} else {
			ai.RideOnEscalator(transform.position, target, speed, 0.0);
			yield WaitForSeconds(interval);
		}
	}
}

function OnDrawGizmos() {
    Gizmos.color = Color(0, 0, 0, 0.5);
    Gizmos.DrawWireSphere(transform.position, radius);
}
