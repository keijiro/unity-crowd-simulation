#pragma strict

private var yaw = 0.0;
private var pitch = 0.0;
private var distance = 0.0;

private var yaw_current = 0.0;
private var pitch_current = 0.0;
private var distance_current = 0.0;

private var pivot_yaw : Transform;
private var pivot_pitch : Transform;

function Awake() {
	pivot_pitch = transform.parent;
	pivot_yaw = pivot_pitch.parent;

	yaw = pivot_yaw.eulerAngles.y;
	pitch = pivot_pitch.eulerAngles.x;
	distance = -transform.localPosition.z;
}

function Update() {
	if (Input.GetMouseButton(0)) {
		yaw += 300.0 * Input.GetAxis("Mouse X") * Time.deltaTime;
		pitch -= 300.0 * Input.GetAxis("Mouse Y") * Time.deltaTime;
	}
	distance = Mathf.Max(0.0, distance - 8.0 * Input.GetAxis("Mouse ScrollWheel") * Time.deltaTime);

	yaw_current = ExpEase.Out(yaw_current, yaw, -3.5);
	pitch_current = ExpEase.Out(pitch_current, pitch, -3.5);
	distance_current = ExpEase.Out(distance_current, distance, -4.0);

	pivot_yaw.localRotation = Quaternion.AngleAxis(yaw_current, Vector3.up);
	pivot_pitch.localRotation = Quaternion.AngleAxis(pitch_current, Vector3.right);
	transform.localPosition.z = -distance_current;
}
