#pragma strict

var escalatorSpeed = 1.1;

function Start() {
	var agent = GetComponent.<NavMeshAgent>();
	var animator = GetComponent.<Animator>();

	agent.updateRotation = false;

	var entrance = GameObject.Find("Entrance " + Random.Range(1, 3)).transform;
	agent.SetDestination(entrance.position);

	yield;

	while (agent.remainingDistance > 0.1) {
		animator.SetFloat("speed", agent.velocity.magnitude);
		if (agent.velocity.magnitude > 0.1) {
			transform.rotation = Quaternion.RotateTowards(transform.rotation, Quaternion.LookRotation(agent.velocity), 360.0 * Time.deltaTime);
		}
		yield;
	}

	agent.enabled = false;
	animator.SetFloat("speed", 0);

	var target = entrance.Find("Target");

	while ((target.position - transform.position).magnitude > 0.1) {
		transform.position = Vector3.MoveTowards(transform.position, target.position, escalatorSpeed * Time.deltaTime);
		transform.rotation = Quaternion.RotateTowards(transform.rotation, Quaternion.AngleAxis(180, Vector3.up), 30 * Time.deltaTime);
		yield;
	}

	Destroy(gameObject);
}
