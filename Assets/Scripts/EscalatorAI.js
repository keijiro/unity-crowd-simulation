#pragma strict

var escalatorSpeed = 1.1;

function Start() {
	var agent = GetComponent.<NavMeshAgent>();
	var animator = GetComponent.<Animator>();

	agent.updateRotation = false;

	var entranceName = (Random.value < 0.666) ? "Entrance 1" : "Entrance 2";
	var entrance = GameObject.Find(entranceName).transform;
	agent.SetDestination(entrance.position);

	yield;

	while (agent.remainingDistance > 0.1) {
		var speed = agent.velocity.magnitude;
		animator.SetFloat("speed", speed);
		if (speed > 0.1) {
			var rotation = Quaternion.LookRotation(agent.velocity);
			transform.rotation = ExpEase.Out(transform.rotation, rotation, -4.0);
		}
		yield;
	}

	agent.enabled = false;
	animator.SetFloat("speed", 0);

	var target = entrance.Find("Target");
	rotation = Quaternion.LookRotation(Vector3.Scale(target.position - entrance.position, Vector3(1, 0, 1)));

	while ((target.position - transform.position).magnitude > 0.1) {
		transform.position = Vector3.MoveTowards(transform.position, target.position, escalatorSpeed * Time.deltaTime);
		transform.rotation = ExpEase.Out(transform.rotation, rotation, -4.0);
		yield;
	}

	Destroy(gameObject);
}
