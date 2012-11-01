#pragma strict

private var agent : NavMeshAgent;

function Awake() {
	agent = GetComponent.<NavMeshAgent>();
}

function Start() {
	var goal = GameObject.Find("Goal " + Random.Range(1, 3));
	agent.SetDestination(goal.transform.position);
}

function Update() {
	var animator = GetComponent.<Animator>();
	animator.SetFloat("speed", agent.velocity.magnitude);
}

function OnTriggerEnter(other : Collider) {
	Destroy(gameObject);
}