       /////////COMP1

        // A 24db low pass moog-style filter.
var synth = flock.synth({
    synthDef: {
        ugen: "flock.ugen.filter.moog",
        cutoff: {
            ugen: "flock.ugen.sinOsc",
            freq: 1/4,
            mul: 5000,
            add: 7000
        },
        resonance: {
            ugen: "flock.ugen.sinOsc",
            freq: .2,
            mul: 1.5,
            add: 1.5
        },
        source: {
            ugen: "flock.ugen.sinOsc",
            freq: {
                ugen: "flock.ugen.sequence",
                freq: .1,
                loop: 1,
                list: [60, 40 * 5/4,],
                options: {
                    interpolation: "linear"
                }
            }
        },
        mul: 0.5
    }
});
                       
                       
                       
// An ascending sinOsc glissando using a line ugen.
var synth = flock.synth({
    synthDef: {
        ugen: "flock.ugen.sinOsc",
        freq: {
            ugen: "flock.ugen.xLine",
            rate: "control",
            duration: 15.0,
            start: 20022,
            end: 1
        },
        mul: {
            ugen: "flock.ugen.env.simpleASR",
            attack: 1.25,
            sustain: .25,
            release: 3.15,
            gate: {
                ugen: "flock.ugen.mouse.click"
            }
        }
    }
});
        
                       
                       

/*/ Simple example of Dust generating random audio noise.
var synth = flock.synth({
    synthDef: {
        ugen: "flock.ugen.dust",
        density: 10,
         mul: {
                ugen: "flock.ugen.whiteNoise"       
             
            },
        freq: {
            ugen: "flock.ugen.xLine",
            start: 180,
            end: 2,
            duration: 10.0
        }
    }
});  */
        
                       
                       
// Create a new synth consisting of a sine wave,
// modulating its amplitude slowly with another sine wave.
var synth = flock.synth({
    synthDef: {
        id: "carrier",
        ugen: "flock.ugen.sinOsc",
        freq: 540,
        mul: {
            id: "mod",
            ugen: "flock.ugen.sinOsc",
            freq: 1.50,
            mul: {
                    id: "mod",
                    ugen: "flock.ugen.triOsc",
                    freq: .230,
                    mul: {
                                                          ugen: "flock.ugen.filter.biquad.bp",
                                    freq: {
                                        ugen: "flock.ugen.mouse.cursor",
                                        options: {
                                            interpolation: "exponential"
                                        },
                                        mul: 10000,
                                        add: 500,
                                        lag: 12
                                    },
                                    q: 1.0,
                                    source: {
                                        ugen: "flock.ugen.triOsc",
                                        freq: 200,
                                        mul: 0.1
                                    }
                },
        },
        }
    }
});
        
                       
                       
                       
// Triggers a note whenever the mouse is clicked.
var synth = flock.synth({
    synthDef: {
        ugen: "flock.ugen.sinOsc",
         freq: {
                                        ugen: "flock.ugen.mouse.cursor",
                                        options: {
                                            interpolation: "exponential"
                                        },
                                        mul: 10000,
                                        add: 500,
                                        lag: 32
                                    },
        mul: {
            ugen: "flock.ugen.env.simpleASR",
            attack: .025,
            sustain: .0125,
            release: 2.15,
            gate: {
                ugen: "flock.ugen.mouse.click"
            }
                       
        }
    }
});
        
        
                       
// Plays back a sound file in a loop.
// The playback rate is controlled by the mouse cursor's vertical position,
// while the end point in the sound file is determined by the mouse's horizontal position.
// Note: this demo needs to be run from a web server to due to buffer-loading restrictions in most browsers.

var synth = flock.synth({
    synthDef: {
        ugen: "flock.ugen.playBuffer",
        buffer: {
            id: "chord",
            url: "../../shared/audio/hillier-first-chord.wav"
        },

        speed: {
            ugen: "flock.ugen.mouse.cursor",
            options: {
                axis: "y"
            },
            add: 0.5
        },

        loop: 1,

        start: 0,

        end: {
            ugen: "flock.ugen.mouse.cursor",
            options: {
                axis: "x"
            }
        }
    }
});
