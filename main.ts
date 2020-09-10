input.onButtonPressed(Button.A, function () {
    basic.showLeds(`
        # . . . #
        . # . # .
        . . # . .
        . # . # .
        # . . . #
        `)
    for (let index = 0; index < n_steps; index++) {
        if (DAQmode == "ACC") {
            xyz_sample = "" + convertToText(input.acceleration(Dimension.X)) + "," + convertToText(input.acceleration(Dimension.Y)) + "," + convertToText(input.acceleration(Dimension.Z))
        }
        if (DAQmode == "MAG") {
            xyz_sample = "" + Math.round(input.magneticForce(Dimension.X) * 10) + "," + Math.round(input.magneticForce(Dimension.Y) * 10) + "," + Math.round(input.magneticForce(Dimension.Z) * 10)
        }
        if (DAQmode == "MIX") {
            xyz_sample = "" + Math.round(input.magneticForce(Dimension.Y) * 10) + "," + Math.round(input.magneticForce(Dimension.Z) * 10) + "," + convertToText(input.acceleration(Dimension.Z))
        }
        bluetooth.uartWriteLine(xyz_sample)
    }
    basic.showLeds(`
        . . . . .
        . . . . .
        . . # . .
        . . . . .
        . . . . .
        `)
})
input.onButtonPressed(Button.B, function () {
    basic.showString(control.deviceName())
})
let xyz_sample = ""
let n_steps = 0
let DAQmode = ""
basic.showLeds(`
    # # # # #
    # . . . #
    # . . . #
    # . . . #
    # # # # #
    `)
DAQmode = "ACC"
let run_time = 10
n_steps = run_time * 33
input.setAccelerometerRange(AcceleratorRange.TwoG)
bluetooth.startUartService()
