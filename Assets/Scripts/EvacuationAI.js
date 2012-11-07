#pragma strict

var delay = 0.0;

private var animator : Animator;
private var agent : NavMeshAgent;

function Awake() {
	animator = GetComponent.<Animator>();
	agent = GetComponent.<NavMeshAgent>();
	agent.updateRotation = false;
}

function Start() {
	yield WaitForSeconds(delay);

	var goal = GameObject.FindWithTag("Goal");
	agent.SetDestination(goal.transform.position);

	// Wait for the first time of path planning.
	while (agent.remainingDistance == 0.0) yield;

	// Wait for the goal.
	while (agent.remainingDistance > 0.5) yield;

	Destroy(gameObject);
}

function Update() {
	var speed = agent.velocity.magnitude;
	animator.SetFloat("speed", speed);
	if (speed > 0.1) {
		var rotation = Quaternion.LookRotation(agent.velocity);
		transform.rotation = ExpEase.Out(transform.rotation, rotation, -4.0);
	}
}
