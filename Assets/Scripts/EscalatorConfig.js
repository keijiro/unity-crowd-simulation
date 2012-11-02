#pragma strict

var fastForwardRatio = 0.3;
var escalatorSpeed = 0.8;
var fastForwardSpeed = 1.5;

static var instance : EscalatorConfig;

function Awake() {
	instance = this;
}