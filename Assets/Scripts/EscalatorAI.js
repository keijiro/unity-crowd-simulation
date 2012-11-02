#pragma strict

var fastForward = false;

private var startTime = 0.0;

function Start() {
	var config = EscalatorConfig.instance;
	var agent = GetComponent.<NavMeshAgent>();
	var animator = GetComponent.<Animator>();

	agent.updateRotation = false;
	if (fastForward) agent.avoidancePriority = 0;

	if (config.allowFastForward) {
		var entranceName = fastForward ? "Entrance 2" : "Entrance 1";
	} else {
		entranceName = (transform.position.x > 0.0) ? "Entrance 1" : "Entrance 2";
	}

	var entrance = GameObject.Find(entranceName).transform;
	agent.SetDestination(entrance.position);

	yield;

	startTime = Time.time;

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

	var target = entrance.Find("Target");
	rotation = Quaternion.LookRotation(Vector3.Scale(target.position - entrance.position, Vector3(1, 0, 1)));

	var escalatorSpeed = fastForward ? config.fastForwardSpeed : config.escalatorSpeed;

	while ((target.position - transform.position).magnitude > 0.1) {
		transform.position = Vector3.MoveTowards(transform.position, target.position, escalatorSpeed * Time.deltaTime);
		transform.rotation = ExpEase.Out(transform.rotation, rotation, -4.0);
		animator.SetFloat("speed", fastForward ? 1.0 : 0.0, 1.0, Time.deltaTime);
		yield;
	}

	FindObjectOfType(EscalatorSummarizer).NotifyTime(Time.time - startTime);

	Destroy(gameObject);
}
