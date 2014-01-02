var instruments = window.instruments || {};
instruments.stackPosition = {
    x: 0,
    y: 0
};
instruments.defaultMargin = 10;
instruments.visible = true;
instruments.list = {};
instruments.definitions = {
    'airspeed': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/airspeed.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'kias',
                    ratio: -1.5,
                    min: 0
                }],
                url: PAGE_PATH + 'overlays/instruments/airspeed-hand.png',
                anchor: {
                    x: 10,
                    y: 34
                },
                size: {
                    x: 20,
                    y: 120
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'airspeedJet': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/airspeed-high.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'kias',
                    ratio: -0.6,
                    min: 0
                }],
                url: PAGE_PATH + 'overlays/instruments/airspeed-hand.png',
                anchor: {
                    x: 10,
                    y: 34
                },
                size: {
                    x: 20,
                    y: 120
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'airspeedSupersonic': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/airspeed-supersonic.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'kias',
                    ratio: -0.3,
                    min: 0
                }],
                url: PAGE_PATH + 'overlays/instruments/airspeed-hand.png',
                anchor: {
                    x: 10,
                    y: 34
                },
                size: {
                    x: 20,
                    y: 120
                },
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                animations: [{
                    type: 'rotate',
                    value: 'mach',
                    ratio: -72,
                    min: 0
                }],
                url: PAGE_PATH + 'overlays/instruments/mach-hand.png',
                anchor: {
                    x: 5,
                    y: 5
                },
                size: {
                    x: 11,
                    y: 31
                },
                position: {
                    x: -70,
                    y: -70
                }
            }]
        }
    },
    'altitude': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/altitude.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'altitude',
                    ratio: -0.0036
                }],
                url: PAGE_PATH + 'overlays/instruments/tenthousandhand.png',
                anchor: {
                    x: 8,
                    y: 0
                },
                size: {
                    x: 16,
                    y: 91
                },
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                animations: [{
                    type: 'rotate',
                    value: 'altitude',
                    ratio: -0.036
                }],
                url: PAGE_PATH + 'overlays/instruments/small-hand.png',
                anchor: {
                    x: 10,
                    y: 28
                },
                size: {
                    x: 20,
                    y: 87
                },
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                animations: [{
                    type: 'rotate',
                    value: 'altitude',
                    ratio: -0.36
                }],
                url: PAGE_PATH + 'overlays/instruments/airspeed-hand.png',
                anchor: {
                    x: 10,
                    y: 34
                },
                size: {
                    x: 20,
                    y: 120
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'vario': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/vario.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'climbrate',
                    ratio: -0.09,
                    max: 1900,
                    min: -1900,
                    offset: 90
                }],
                url: PAGE_PATH + 'overlays/instruments/airspeed-hand.png',
                anchor: {
                    x: 10,
                    y: 34
                },
                size: {
                    x: 20,
                    y: 120
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'varioJet': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/vario-high.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'climbrate',
                    ratio: -0.025,
                    max: 6000,
                    min: -6000,
                    offset: 90
                }],
                url: PAGE_PATH + 'overlays/instruments/airspeed-hand.png',
                anchor: {
                    x: 10,
                    y: 34
                },
                size: {
                    x: 20,
                    y: 120
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'compass': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/compass.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'heading',
                    ratio: 1
                }],
                url: PAGE_PATH + 'overlays/instruments/compass-grad.png',
                anchor: {
                    x: 90,
                    y: 90
                },
                size: {
                    x: 181,
                    y: 181
                },
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                url: PAGE_PATH + 'overlays/instruments/compass-hand.png',
                anchor: {
                    x: 25,
                    y: 26
                },
                size: {
                    x: 50,
                    y: 109
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'attitude': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/attitude.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'aroll',
                    name: 'attitude',
                    ratio: -1,
                    min: -50,
                    max: 50
                }, {
                    type: 'translateY',
                    value: 'atilt',
                    ratio: -2,
                    offset: 75,
                    min: -25,
                    max: 25
                }],
                url: PAGE_PATH + 'overlays/instruments/attitude-hand.png',
                anchor: {
                    x: 100,
                    y: 75
                },
                size: {
                    x: 200,
                    y: 150
                },
                position: {
                    x: 0,
                    y: 0
                },
                iconFrame: {
                    x: 200,
                    y: 150
                }
            }, {
                animations: [{
                    type: 'rotate',
                    value: 'aroll',
                    ratio: -1,
                    min: -60,
                    max: 60
                }],
                url: PAGE_PATH + 'overlays/instruments/attitude-grad.png',
                anchor: {
                    x: 100,
                    y: 100
                },
                size: {
                    x: 200,
                    y: 200
                },
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                url: PAGE_PATH + 'overlays/instruments/attitude-pointer.png',
                anchor: {
                    x: 100,
                    y: 100
                },
                size: {
                    x: 200,
                    y: 200
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'attitudeJet': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/attitude-jet.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'aroll',
                    ratio: -1,
                    min: -180,
                    max: 180
                }, {
                    type: 'translateY',
                    value: 'atilt',
                    ratio: -2,
                    offset: 330,
                    min: -90,
                    max: 90
                }],
                url: PAGE_PATH + 'overlays/instruments/attitude-jet-hand.png',
                anchor: {
                    x: 100,
                    y: 70
                },
                size: {
                    x: 200,
                    y: 140
                },
                position: {
                    x: 0,
                    y: 0
                },
                iconFrame: {
                    x: 200,
                    y: 140
                }
            }, {
                animations: [{
                    type: 'rotate',
                    value: 'aroll',
                    ratio: -1,
                    min: -60,
                    max: 60
                }],
                url: PAGE_PATH + 'overlays/instruments/attitude-jet-pointer.png',
                anchor: {
                    x: 100,
                    y: 100
                },
                size: {
                    x: 200,
                    y: 200
                },
                position: {
                    x: 0,
                    y: 0
                }
            }, {
                url: PAGE_PATH + 'overlays/instruments/attitude-jet.png',
                anchor: {
                    x: 100,
                    y: 100
                },
                size: {
                    x: 200,
                    y: 200
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'rpmJet': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/jet-rpm.png',
            size: {
                x: 200,
                y: 200
            },
            anchor: {
                x: 100,
                y: 100
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'rpm',
                    ratio: -0.036,
                    offset: 0
                }],
                url: PAGE_PATH + 'overlays/instruments/jet-rpm-hand.png',
                anchor: {
                    x: 6,
                    y: 15
                },
                size: {
                    x: 14,
                    y: 34
                },
                position: {
                    x: -38,
                    y: 45
                }
            }, {
                animations: [{
                    type: 'rotate',
                    value: 'rpm',
                    ratio: -0.027,
                    offset: 0
                }],
                url: PAGE_PATH + 'overlays/instruments/airspeed-hand.png',
                anchor: {
                    x: 10,
                    y: 34
                },
                size: {
                    x: 20,
                    y: 120
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'rpm': {
        stackX: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/rpm.png',
            size: {
                x: 100,
                y: 100
            },
            anchor: {
                x: 50,
                y: 50
            },
            position: {
                x: 0,
                y: 50
            },
            position: {
                x: 0,
                y: 110
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'rpm',
                    ratio: -0.03,
                    offset: 120
                }],
                url: PAGE_PATH + 'overlays/instruments/rpm-hand.png',
                anchor: {
                    x: 14,
                    y: 14
                },
                size: {
                    x: 28,
                    y: 55
                },
                position: {
                    x: 0,
                    y: 0
                }
            }]
        }
    },
    'wind': {
        overlay: {
            url: PAGE_PATH + 'overlays/hud/wind-body.png',
            opacity: 0.7,
            scale: {
                x: 0.7,
                y: 0.7
            },
            position: {
                x: 20,
                y: 20
            },
            anchor: {
                x: 200,
                y: 200
            },
            size: {
                x: 200,
                y: 200
            },
            alignment: {
                x: 'right',
                y: 'top'
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'relativeWind',
                    ratio: -1
                }],
                url: PAGE_PATH + 'overlays/hud/wind-hand.png',
                anchor: {
                    x: 100,
                    y: 100
                },
                size: {
                    x: 200,
                    y: 200
                },
                position: {
                    x: -100,
                    y: -100
                },
                opacity: 0.7
            }]
        }
    },
    'spoilers': {
        stackY: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/spoilers.png',
            visibility: false,
            anchor: {
                x: 85,
                y: 0
            },
            alignment: {
                x: 'right',
                y: 'bottom'
            },
            position: {
                x: 10,
                y: 0
            },
            size: {
                x: 85,
                y: 21
            },
            rescale: true,
            rescalePosition: true,
            animations: [{
                value: 'airbrakesPosition',
                type: 'show',
                whenNot: [0]
            }]
        }
    },
    'brakes': {
        stackY: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/brakes.png',
            visibility: false,
            anchor: {
                x: 73,
                y: 0
            },
            alignment: {
                x: 'right',
                y: 'bottom'
            },
            position: {
                x: 10,
                y: 0
            },
            size: {
                x: 73,
                y: 19
            },
            rescale: true,
            rescalePosition: true,
            animations: [{
                value: 'brakes',
                type: 'show',
                when: [1]
            }]
        }
    },
    'gear': {
        stackY: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/gear.png',
            anchor: {
                x: 60,
                y: 0
            },
            alignment: {
                x: 'right',
                y: 'bottom'
            },
            position: {
                x: 10,
                y: 0
            },
            size: {
                x: 46,
                y: 16
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    value: 'gearPosition',
                    type: 'show',
                    when: [0]
                }],
                url: PAGE_PATH + 'overlays/instruments/led-green.png',
                anchor: {
                    x: 0,
                    y: 0
                },
                size: {
                    x: 12,
                    y: 12
                },
                position: {
                    x: -10,
                    y: 2
                }
            }, {
                animations: [{
                    value: 'gearPosition',
                    type: 'show',
                    when: [1]
                }],
                url: PAGE_PATH + 'overlays/instruments/led-red.png',
                anchor: {
                    x: 0,
                    y: 0
                },
                size: {
                    x: 12,
                    y: 12
                },
                position: {
                    x: -10,
                    y: 2
                }
            }, {
                animations: [{
                    value: 'gearPosition',
                    type: 'show',
                    whenNot: [0, 1]
                }],
                url: PAGE_PATH + 'overlays/instruments/led-orange.png',
                anchor: {
                    x: 0,
                    y: 0
                },
                size: {
                    x: 12,
                    y: 12
                },
                position: {
                    x: -10,
                    y: 2
                }
            }]
        }
    },
    'flaps': {
        stackY: true,
        overlay: {
            url: PAGE_PATH + 'overlays/instruments/flaps.png',
            anchor: {
                x: 74,
                y: 0
            },
            alignment: {
                x: 'right',
                y: 'bottom'
            },
            position: {
                x: 10,
                y: 0
            },
            size: {
                x: 74,
                y: 23
            },
            rescale: true,
            rescalePosition: true,
            overlays: [{
                animations: [{
                    type: 'rotate',
                    value: 'flapsPosition',
                    ratio: -20
                }],
                url: PAGE_PATH + 'overlays/instruments/flaps-hand.png',
                anchor: {
                    x: 0,
                    y: 5
                },
                size: {
                    x: 17,
                    y: 6
                },
                position: {
                    x: -23,
                    y: 25
                }
            }]
        }
    }
};

instruments.init = function (newInstrumentList) {
    if (!newInstrumentList || newInstrumentList == 'default') {
        newInstrumentList = {
            'airspeed': '',
            'altitude': '',
            'attitude': '',
            'vario': '',
            'compass': '',
            'rpm': '',
            'brakes': ''
        }
    }
    if (newInstrumentList == 'jet') {
        newInstrumentList = {
            'airspeedJet': '',
            'altitude': '',
            'attitudeJet': '',
            'varioJet': '',
            'compass': '',
            'rpmJet': '',
            'brakes': ''
        }
    }
    for (var i in instruments.list) {
        instruments.list[i].destroy()
    }
    instruments.stackPosition = {
        x: 10,
        y: 100
    };
    instruments.list = {};
    for (var i in newInstrumentList) {
        var definition = $.extend(true, {}, newInstrumentList[i], instruments.definitions[i]);
        if (definition) {
            instruments.list[i] = new Indicator(definition)
        }
    }
    if (!instruments.list['wind']) {
        instruments.definitions['wind'].visibility = ges.preferences.weather.windActive ? true : false;
        instruments.list['wind'] = new Indicator(instruments.definitions['wind'])
    }
    instruments.resizeHandler = ges.addResizeHandler(function () {
        instruments.updateScreenPositions()
    })
};

instruments.toggle = function () {
    if (instruments.visible) {
        instruments.hide()
    } else {
        instruments.show()
    }
};
instruments.hide = function () {
    for (var i in instruments.list) {
        instruments.list[i].hide()
    }
    instruments.visible = false
};
instruments.show = function () {
    for (var i in instruments.list) {
        instruments.list[i].show()
    }
    instruments.visible = true
};
instruments.update = function () {
    for (var i in instruments.list) {
        var instrument = instruments.list[i];
        instrument.update()
    }
};
instruments.updateCockpitPositions = function () {
    for (var i in instruments.list) {
        var instrument = instruments.list[i];
        instrument.updateCockpitPosition()
    }
};
instruments.updateScreenPositions = function () {
    for (var i in instruments.list) {
        var instrument = instruments.list[i];
        if (camera.currentModeName == 'cockpit' && instrument.definition.cockpit) {
            instrument.updateCockpitPosition()
        } else {
            instrument.overlay.resizeFromScreen()
        }
    }
};