#pragma strict

var style : GUIStyle;

private var timeSum = 0.0;
private var timeCount = 0;

function NotifyTime(time : float) {
	timeSum += time;
	timeCount++;
}

function OnGUI() {
	if (timeCount > 0) {
		GUI.Label(Rect(0, 0, 200, 200), "Avg. = " + (timeSum / timeCount), style);
	}
}
