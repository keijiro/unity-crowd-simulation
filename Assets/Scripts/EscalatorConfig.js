#pragma strict

var allowFastForward = true;
var fastForwardRatio = 0.3;
var escalatorSpeed = 0.8;
var fastForwardSpeed = 1.5;
var manPerMinute = 60.0;

static var instance : EscalatorConfig;

function Awake() {
	instance = this;
}