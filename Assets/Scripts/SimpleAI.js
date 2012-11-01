#pragma strict

var delay = 0.0;

private var agent : NavMeshAgent;

function Awake() {
	agent = GetComponent.<NavMeshAgent>();
}

function Start() {
	yield WaitForSeconds(delay);

	var goal = GameObject.FindWithTag("Goal");
	agent.SetDestination(goal.transform.position);
}

function Update() {
	var animator = GetComponent.<Animator>();
	animator.SetFloat("speed", agent.velocity.magnitude);
}

function OnTriggerEnter(other : Collider) {
	Destroy(gameObject);
}
