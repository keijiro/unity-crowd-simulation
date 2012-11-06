#pragma strict

var entranceName = "Entrance 1";

private var agent : NavMeshAgent;
private var animator : Animator;
private var ridden = false;

function Start() {
	agent = GetComponent.<NavMeshAgent>();
	animator = GetComponent.<Animator>();

	agent.updateRotation = false;
	agent.SetDestination(GameObject.Find(entranceName).transform.position);

	while (!ridden) {
		var speed = agent.velocity.magnitude;
		animator.SetFloat("speed", speed);
		if (speed > 0.1) {
			var rotation = Quaternion.LookRotation(agent.velocity);
			transform.rotation = ExpEase.Out(transform.rotation, rotation, -4.0);
		}
		yield;
	}
}

function RideOnEscalator(entrance : Vector3, target : Vector3, escalatorSpeed : float) {
	ridden = true;
	agent.enabled = false;
	collider.enabled = false;

	var rotation = Quaternion.LookRotation(Vector3.Scale(target - entrance, Vector3(1, 0, 1)));

	for (var time = 0.0; time < 0.5; time += Time.deltaTime) {
		transform.position = ExpEase.Out(transform.position, entrance, -4.0);
		transform.rotation = ExpEase.Out(transform.rotation, rotation, -4.0);
		animator.SetFloat("speed", 0.0, 0.2, Time.deltaTime);
		yield;
	}

	while ((target - transform.position).magnitude > 0.1) {
		transform.position = Vector3.MoveTowards(transform.position, target, escalatorSpeed * Time.deltaTime);
		yield;
	}

	Destroy(gameObject);
}
