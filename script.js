if (innerWidth >= innerHeight) {
    document.getElementById("canvas").style = `height: 100%; aspect-ratio: 1`
    document.getElementById("canvas").width = innerHeight
    document.getElementById("canvas").height = innerHeight
} else if (innerHeight > innerWidth) {
    document.getElementById("canvas").style = `width: 100%; aspect-ratio: 1`
    document.getElementById("canvas").width = innerWidth
    document.getElementById("canvas").height = innerWidth
}
const canvas = document.getElementById("canvas")
canvas.focus()
const c = canvas.getContext("2d")
const PLANET_IMAGE = new Image()
PLANET_IMAGE.src = "assets/img/planet.svg"
const UFO_IMAGE = new Image()
UFO_IMAGE.src = "assets/img/ufo.svg"
const NEW_HIGH_SCORE_IMAGE = new Image()
NEW_HIGH_SCORE_IMAGE.src = "assets/img/new_high_score.svg"
const AUDIO = {
    start: new Audio("assets/sound/start.wav"),
    end: new Audio("assets/sound/end.mp3"),
    score: new Audio("assets/sound/score.wav"),
    music: new Audio("assets/sound/music.mp3")
}
AUDIO.music.volume = 0.1
AUDIO.music.loop = true
var higher_score = false
var high_score = localStorage.getItem("high score")
class Scene {
    constructor() {
        this.width = canvas.height * 30 / 100
        this.height = this.width * 23 / 50
        this.x = (canvas.width / 2) - (this.width / 2)
        this.y = (canvas.height / 2) - (this.height / 2)
        this.velocity = 0
        this.up = false
    }
    update() {
        this.velocity += this.up ? 0.1 : -0.1
        if (this.velocity >= 7) {
            this.up = false
        } else if (this.velocity <= -7) {
            this.up = true
        }
        this.width = canvas.height * 30 / 100
        this.height = this.width * 23 / 50
        this.x = (canvas.width / 2) - (this.width / 2)
        this.y = (canvas.height * 0.2) - (this.height / 2) - (canvas.height * this.velocity / 100)
        c.textAlign = "center"
        c.fillStyle = "black"
        c.font = `${canvas.height * 0.07}px HammersmithOne`
        c.fillText("PRESS ENTER TO START", canvas.width / 2, canvas.height * 0.55)
        c.drawImage(UFO_IMAGE, this.x, this.y, this.width, this.height)
    }
    update2() {
        this.velocity += this.up ? 0.1 : -0.1
        if (this.velocity >= 7) {
            this.up = false
        } else if (this.velocity <= -7) {
            this.up = true
        }
        this.width = canvas.height * 30 / 100
        this.height = this.width * 23 / 50
        this.x = (canvas.width / 2) - (this.width / 2)
        this.y = (canvas.height * 0.2) - (this.height / 2) - (canvas.height * this.velocity / 100)
        c.textAlign = "center"
        c.fillStyle = "black"
        c.font = `${canvas.height * 0.07}px HammersmithOne`
        c.fillText("PRESS ENTER TO RESTART", canvas.width / 2, canvas.height * 0.55)
        c.drawImage(UFO_IMAGE, this.x, this.y, this.width, this.height)
        c.textAlign = "left"
        c.font = `${canvas.height * 0.05}px HammersmithOne`
        c.fillText(`Time: ${game.time}`, canvas.width * 0.095, canvas.height * 0.75)
        c.fillText(`Score: ${game.score}`, canvas.width * 0.095, canvas.height * 0.8)
        if (higher_score) {
            c.drawImage(NEW_HIGH_SCORE_IMAGE, canvas.width * 0.65, canvas.height * 0.7, canvas.height * 0.3, (canvas.height * 0.3) * 639.8 / 982)
        } else {
            c.fillText(`High Score: ${high_score}`, canvas.width * 0.095, canvas.height * 0.85)
        }
    }
}
var starting_scene
var SCENE = new Scene()

function start_scene_menu() {
    starting_scene = requestAnimationFrame(start_scene_menu)
    c.clearRect(0, 0, canvas.width, canvas.height)
    SCENE.update()
}

new FontFace('HammersmithOne', 'url(assets/font/HammersmithOne.ttf)').load().then(font => {
    document.fonts.add(font)
    start_scene_menu()
})

var game_over_scene

function game_over_scene_menu() {
    game_over_scene = requestAnimationFrame(game_over_scene_menu)
    c.clearRect(0, 0, canvas.width, canvas.height)
    SCENE.update2()
}

function convertSeconds(value) {
    const sec = parseInt(value)
    let hours = Math.floor(sec / 3600)
    let minutes = Math.floor((sec - hours * 3600) / 60)
    let seconds = sec - hours * 3600 - minutes * 60
    if (hours < 10) hours = '0' + hours
    if (minutes < 10) minutes = '0' + minutes
    if (seconds < 10) seconds = '0' + seconds
    game.time = hours == 0 ? minutes + ':' + seconds : hours + ':' + minutes + ':' + seconds
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2))
}
var pressed = {}
var planet = {
    x: null,
    y: null,
    radius: null,
}
var target = {
    x: null,
    y: null,
    radius: null
}
var death_targets = []
var ufo = {
    x1: null,
    y1: null,
    x2: null,
    y2: null,
    x3: null,
    y3: null,
    x4: null,
    y4: null,
    x5: null,
    y5: null,
    radius1: null,
    radius2: null,
    radius3: null,
    angle: null
}
var projectile = {
    x: null,
    y: null,
    radius: null,
    speed: 27,
    shoot: false
}
var game = {
    realtimer: 0,
    timer: 0,
    time: "0",
    score: 0,
    minRange: 5,
    maxRange: 10,
    play: false,
    playing: false,
    rotate: 0.5
}

function redefine() {
    pressed = {}
    planet = {
        x: null,
        y: null,
        radius: null,
    }
    target = {
        x: null,
        y: null,
        radius: null
    }
    death_targets = []
    ufo = {
        x1: null,
        y1: null,
        x2: null,
        y2: null,
        x3: null,
        y3: null,
        x4: null,
        y4: null,
        x5: null,
        y5: null,
        radius1: null,
        radius2: null,
        radius3: null,
        angle: null
    }
    projectile = {
        x: null,
        y: null,
        radius: null,
        speed: 27,
        shoot: false
    }
}

class Planet {
    constructor() {
        this.scale = canvas.height * 27 / 100
        this.x = canvas.width / 2 - (this.scale / 2)
        this.y = canvas.height / 2 - (this.scale / 2)
        this.width = this.scale
        this.height = this.scale
        this.angle = 0
    }
    update() {
        this.angle += game.rotate
        this.scale = canvas.height * 27 / 100
        this.width = this.scale
        this.height = this.scale
        planet.x = canvas.width / 2
        planet.y = canvas.height / 2
        planet.radius = this.scale / 2
        c.save()
        c.translate(canvas.width / 2, canvas.height / 2)
        c.beginPath()
        c.rotate(this.angle * Math.PI / 180)
        c.drawImage(PLANET_IMAGE, 0 - (this.width / 2), 0 - (this.height / 2), this.width, this.height)
        c.restore()
    }
}

class PLANET_DIRECTION {
    constructor() {
        this.update()
    }
    update() {
        setTimeout(() => {
            game.rotate *= Math.round(Math.random()) ? 1 : -1
            if (game.playing) this.update()
        }, (Math.random() * (game.maxRange - game.minRange) + game.minRange) * 1000)
    }
}

class Ufo {
    constructor() {
        this.width = canvas.height * 8 / 100
        this.height = this.width * 23 / 50
        this.radius1 = this.width * 11 / 50
        this.radius2 = this.width * 5 / 50
        this.radius3 = this.width * 6 / 50
        this.distance1 = canvas.height * 27.9 / 100
        this.distance2 = canvas.height * 27.8 / 100
        this.distance3 = canvas.height * 28 / 100
        this.angle = 0
    }
    update() {
        this.width = canvas.height * 8 / 100
        this.height = this.width * 23 / 50
        this.radius1 = this.width * 11 / 50
        this.radius2 = this.width * 5 / 50
        this.radius3 = this.width * 6 / 50
        this.distance1 = canvas.height * 27.9 / 100
        this.distance2 = canvas.height * 27.8 / 100
        this.distance3 = canvas.height * 28 / 100
        ufo.x1 = (this.distance1 * Math.cos((this.angle - 6 - 90) * Math.PI / 180)) + (canvas.width / 2)
        ufo.y1 = (this.distance1 * Math.sin((this.angle - 6 - 90) * Math.PI / 180)) + (canvas.height / 2)
        ufo.x2 = (this.distance2 * Math.cos((this.angle - 4 - 90) * Math.PI / 180)) + (canvas.width / 2)
        ufo.y2 = (this.distance2 * Math.sin((this.angle - 4 - 90) * Math.PI / 180)) + (canvas.height / 2)
        ufo.x3 = (this.distance3 * Math.cos((this.angle - 90) * Math.PI / 180)) + (canvas.width / 2)
        ufo.y3 = (this.distance3 * Math.sin((this.angle - 90) * Math.PI / 180)) + (canvas.height / 2)
        ufo.x4 = (this.distance2 * Math.cos((this.angle + 4 - 90) * Math.PI / 180)) + (canvas.width / 2)
        ufo.y4 = (this.distance2 * Math.sin((this.angle + 4 - 90) * Math.PI / 180)) + (canvas.height / 2)
        ufo.x5 = (this.distance1 * Math.cos((this.angle + 6 - 90) * Math.PI / 180)) + (canvas.width / 2)
        ufo.y5 = (this.distance1 * Math.sin((this.angle + 6 - 90) * Math.PI / 180)) + (canvas.height / 2)
        ufo.radius1 = this.radius1
        ufo.radius2 = this.radius2
        ufo.radius3 = this.radius3
        c.save()
        c.translate(canvas.width / 2, canvas.height / 2)
        c.rotate(this.angle * Math.PI / 180)
        c.drawImage(UFO_IMAGE, -(this.width / 2), -(this.height / 2) - this.distance3, this.width, this.height)
        c.restore()
        if (!projectile.shoot) {
            ufo.angle = this.angle
        }
    }
    left() {
        this.angle -= 1.3
        if (!projectile.shoot) ufo.angle = this.angle
    }
    right() {
        this.angle += 1.3
        if (!projectile.shoot) ufo.angle = this.angle
    }
}

class Projectile {
    constructor() {
        this.angle = ufo.angle
        this.radius = canvas.height * 0.5 / 100
        this.distance = canvas.height * projectile.speed / 100
    }
    reconstruct() {
        projectile.speed = 27
        projectile.shoot = false
    }
    update() {
        if (!projectile.shoot) return
        projectile.speed--
        this.angle = ufo.angle
        this.radius = canvas.height * 0.5 / 100
        this.distance = canvas.height * projectile.speed / 100
        projectile.x = (this.distance * Math.cos((this.angle - 90) * Math.PI / 180)) + (canvas.width / 2)
        projectile.y = (this.distance * Math.sin((this.angle - 90) * Math.PI / 180)) + (canvas.height / 2)
        projectile.radius = this.radius
        c.save()
        c.translate(canvas.width / 2, canvas.height / 2)
        c.rotate(this.angle * Math.PI / 180)
        c.beginPath()
        c.arc(0, -this.distance, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = "#FDC500"
        c.fill()
        c.restore()
    }
}

class Target {
    constructor() {
        this.angle = Math.random() * 360
        this.radius = canvas.height * 2 / 100
        this.distance = canvas.height * 13 / 100
        this.count = 0
    }
    reconstruct() {
        this.count = 0
        this.angle += Math.random() * 360
        this.radius = canvas.height * 2 / 100
        this.distance = canvas.height * 13 / 100
        target.x = canvas.width / 2
        target.y = canvas.height / 2
        target.radius = this.radius
        c.save()
        c.translate(canvas.width / 2, canvas.height / 2)
        c.rotate(this.angle * Math.PI / 180)
        c.beginPath()
        c.arc(0, 0, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = "#FDC500"
        c.fill()
        c.restore()
    }
    update() {
        this.count++
        this.angle += game.rotate
        this.radius = canvas.height * 2 / 100
        this.distance = canvas.height * 13 / 100
        target.x = canvas.width / 2
        target.y = canvas.height / 2
        target.radius = this.radius
        if (this.count >= 75) {
            this.distance = canvas.height * 13 / 100
            target.x = (this.distance * Math.cos((this.angle - 90) * Math.PI / 180)) + (canvas.width / 2)
            target.y = (this.distance * Math.sin((this.angle - 90) * Math.PI / 180)) + (canvas.height / 2)
            target.radius = this.radius
        } else if (this.count >= 60) {
            this.distance = 0
        } else if (this.count >= 45) {
            this.distance = canvas.height * 13 / 100
        } else if (this.count >= 30) {
            this.distance = 0
        } else if (this.count >= 15) {
            this.distance = canvas.height * 13 / 100
        }
        c.save()
        c.translate(canvas.width / 2, canvas.height / 2)
        c.rotate(this.angle * Math.PI / 180)
        c.beginPath()
        c.arc(0, -this.distance, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = "#FDC500"
        c.fill()
        c.restore()
    }
}

class Death_Target {
    constructor(i) {
        death_targets.push({
            x: null,
            y: null,
            radius: null
        })
        this.angle = Math.random() * 360
        this.radius = canvas.height * 1.5 / 100
        this.distance = canvas.height * 13 / 100
        this.i = i
        this.count = 0
    }
    reconstruct() {
        this.count = 0
        this.angle += Math.random() * 360
        this.radius = canvas.height * 1.5 / 100
        this.distance = canvas.height * 13 / 100
        death_targets[this.i].x = canvas.width / 2
        death_targets[this.i].y = canvas.height / 2
        death_targets[this.i].radius = this.radius
        c.save()
        c.translate(canvas.width / 2, canvas.height / 2)
        c.rotate(this.angle * Math.PI / 180)
        c.beginPath()
        c.arc(0, 0, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = "black"
        c.fill()
        c.restore()
    }
    update() {
        this.count++
        this.angle += game.rotate
        this.radius = canvas.height * 1.5 / 100
        this.distance = canvas.height * 13 / 100
        death_targets[this.i].x = canvas.width / 2
        death_targets[this.i].y = canvas.height / 2
        death_targets[this.i].radius = this.radius
        if (this.count >= 75) {
            this.distance = canvas.height * 13 / 100
            death_targets[this.i].x = (this.distance * Math.cos((this.angle - 90) * Math.PI / 180)) + (canvas.width / 2)
            death_targets[this.i].y = (this.distance * Math.sin((this.angle - 90) * Math.PI / 180)) + (canvas.height / 2)
            death_targets[this.i].radius = this.radius
        } else if (this.count >= 60) {
            this.distance = 0
        } else if (this.count >= 45) {
            this.distance = canvas.height * 13 / 100
        } else if (this.count >= 30) {
            this.distance = 0
        } else if (this.count >= 15) {
            this.distance = canvas.height * 13 / 100
        }
        c.save()
        c.translate(canvas.width / 2, canvas.height / 2)
        c.rotate(this.angle * Math.PI / 180)
        c.beginPath()
        c.arc(0, -this.distance, this.radius, 0, Math.PI * 2, false)
        c.fillStyle = "black"
        c.fill()
        c.restore()
    }
}

class Asteroid {
    constructor() {
        var pos = Math.floor(Math.random() * 4) + 1
        if (pos == 1) {
            this.x = (Math.random() * 200) + 10
            this.y = 10
            this.dx = ((Math.random() * 0.3) + 0.1) * (Math.round(Math.random()) ? 1 : -1)
            this.dy = ((Math.random() * 0.3) + 0.1)
        } else if (pos == 2) {
            this.x = 210
            this.y = (Math.random() * 200) + 10
            this.dx = ((Math.random() * 0.3) + 0.1) * -1
            this.dy = ((Math.random() * 0.3) + 0.1) * (Math.round(Math.random()) ? 1 : -1)
        } else if (pos == 3) {
            this.x = (Math.random() * 200) + 10
            this.y = 210
            this.dx = ((Math.random() * 0.3) + 0.1) * (Math.round(Math.random()) ? 1 : -1)
            this.dy = ((Math.random() * 0.3) + 0.1) * -1
        } else if (pos == 4) {
            this.x = 10
            this.y = (Math.random() * 200) + 10
            this.dx = ((Math.random() * 0.3) + 0.1)
            this.dy = ((Math.random() * 0.3) + 0.1) * (Math.round(Math.random()) ? 1 : -1)
        }
        var x, y, dx, dy
        x = this.x
        y = this.y
        dx = this.dx
        dy = this.dy
        this.R_X = (canvas.width * x / 100) - (canvas.width * 60 / 100)
        this.R_Y = (canvas.height * y / 100) - (canvas.height * 60 / 100)
        this.R_DX = canvas.width * dx / 100
        this.R_DY = canvas.height * dy / 100
        this.RADIUS = canvas.height * 2 / 100
        this.MOVE_COUNT = 0
    }
    reconstruct() {
        var pos = Math.floor(Math.random() * 4) + 1
        if (pos == 1) {
            this.x = (Math.random() * 200) + 10
            this.y = 10
            this.dx = ((Math.random() * 0.3) + 0.1) * (Math.round(Math.random()) ? 1 : -1)
            this.dy = ((Math.random() * 0.3) + 0.1)
        } else if (pos == 2) {
            this.x = 210
            this.y = (Math.random() * 200) + 10
            this.dx = ((Math.random() * 0.3) + 0.1) * -1
            this.dy = ((Math.random() * 0.3) + 0.1) * (Math.round(Math.random()) ? 1 : -1)
        } else if (pos == 3) {
            this.x = (Math.random() * 200) + 10
            this.y = 210
            this.dx = ((Math.random() * 0.3) + 0.1) * (Math.round(Math.random()) ? 1 : -1)
            this.dy = ((Math.random() * 0.3) + 0.1) * -1
        } else if (pos == 4) {
            this.x = 10
            this.y = (Math.random() * 200) + 10
            this.dx = ((Math.random() * 0.3) + 0.1)
            this.dy = ((Math.random() * 0.3) + 0.1) * (Math.round(Math.random()) ? 1 : -1)
        }
        this.MOVE_COUNT = 0
    }
    update() {
        this.R_X = (this.x - 60) * canvas.width / 100
        this.R_Y = (this.y - 60) * canvas.height / 100
        this.R_DX = this.dx * canvas.width / 100
        this.R_DY = this.dy * canvas.height / 100
        this.RADIUS = canvas.height * 2 / 100
        if ((this.R_X + (this.R_DX * this.MOVE_COUNT) - this.RADIUS) < -(canvas.width * 60 / 100) || (this.R_X + (this.R_DX * this.MOVE_COUNT) + this.RADIUS) > (canvas.width * 220 / 100) - (canvas.width * 60 / 100)) {
            this.reconstruct()
        } else if ((this.R_Y + (this.R_DY * this.MOVE_COUNT) - this.RADIUS) < -(canvas.height * 60 / 100) || (this.R_Y + (this.R_DY * this.MOVE_COUNT) + this.RADIUS) > (canvas.height * 220 / 100) - (canvas.height * 60 / 100)) {
            this.reconstruct()
        } else if ((getDistance(planet.x, planet.y, this.R_X + (this.R_DX * this.MOVE_COUNT), this.R_Y + (this.R_DY * this.MOVE_COUNT))) < (planet.radius + this.RADIUS)) {
            this.reconstruct()
        } else if ((getDistance(ufo.x1, ufo.y1, this.R_X + (this.R_DX * this.MOVE_COUNT), this.R_Y + (this.R_DY * this.MOVE_COUNT))) < (ufo.radius2 + this.RADIUS)) {
            end_game()
        } else if ((getDistance(ufo.x2, ufo.y2, this.R_X + (this.R_DX * this.MOVE_COUNT), this.R_Y + (this.R_DY * this.MOVE_COUNT))) < (ufo.radius3 + this.RADIUS)) {
            end_game()
        } else if ((getDistance(ufo.x3, ufo.y3, this.R_X + (this.R_DX * this.MOVE_COUNT), this.R_Y + (this.R_DY * this.MOVE_COUNT))) < (ufo.radius1 + this.RADIUS)) {
            end_game()
        } else if ((getDistance(ufo.x4, ufo.y4, this.R_X + (this.R_DX * this.MOVE_COUNT), this.R_Y + (this.R_DY * this.MOVE_COUNT))) < (ufo.radius3 + this.RADIUS)) {
            end_game()
        } else if ((getDistance(ufo.x5, ufo.y5, this.R_X + (this.R_DX * this.MOVE_COUNT), this.R_Y + (this.R_DY * this.MOVE_COUNT))) < (ufo.radius2 + this.RADIUS)) {
            end_game()
        } else this.MOVE_COUNT++
        c.save()
        c.beginPath()
        c.arc(this.R_X + (this.R_DX * this.MOVE_COUNT), this.R_Y + (this.R_DY * this.MOVE_COUNT), this.RADIUS, 0, Math.PI * 2, false)
        c.fillStyle = "black"
        c.fill()
        c.restore()
    }
}

class Score {
    update() {
        this.scale = canvas.height * 5 / 100
        this.text = (game.score).toString()
        this.x = canvas.width * 3 / 100
        this.y = (canvas.height * 2 / 100) + this.scale
        c.textAlign = "start"
        c.font = `${this.scale}px HammersmithOne`
        c.fillStyle = "black"
        c.fillText(this.text, this.x, this.y)
    }
}

var PLANET, UFO, PROJECTILE, TARGET, DEATH_TARGETS, ASTEROIDS, SCORE

function start_game() {
    pressed = {}
    PLANET = new Planet()
    UFO = new Ufo()
    PROJECTILE = new Projectile()
    TARGET = new Target()
    DEATH_TARGETS = []
    DEATH_TARGETS_POSITION = []
    ASTEROIDS = []
    SCORE = new Score()
    for (var i = 0; i < 5; i++) ASTEROIDS.push(new Asteroid())
    game = {
        realtimer: 0,
        timer: 0,
        time: "0",
        score: 0,
        minRange: 5,
        maxRange: 10,
        play: true,
        playing: true,
        rotate: 0.5
    }
    var gameinterval = setInterval(() => {
        if (!game.playing) {
            clearInterval(gameinterval)
            return
        }
        if (game.play) {
            game.timer++
            if (((game.rotate > 0) && (game.rotate >= 7)) || ((game.rotate < 0) && (game.rotate <= -7))) {
                game.rotate = game.rotate > 0 ? 7 : -7
            } else {
                game.rotate += game.rotate > 0 ? 0.0005 : -0.0005
            }
            if (game.minRange) {
                game.minRange -= 0.0001
                game.maxRange -= 0.0001
            }
        }
    }, 100)
    var gameinterval2 = setInterval(() => {
        if (!game.playing) {
            clearInterval(gameinterval2)
            return
        }
        if (game.play) {
            game.realtimer++
            if ((game.realtimer % 7) == 0) ASTEROIDS.push(new Asteroid())
            if (DEATH_TARGETS.length < 5)
                if (!game.realtimer % 40) DEATH_TARGETS.push(new Death_Target(DEATH_TARGETS.length))
        }
    }, 1000);
    start_game_loop()
    new PLANET_DIRECTION()
}

var start_game_looping

function start_game_loop() {
    start_game_looping = requestAnimationFrame(start_game_loop)
    var ended = false
    c.clearRect(0, 0, canvas.width, canvas.height)
    if (!game.play) {
        cancelAnimationFrame(start_game_looping)
        return
    }
    for (let l = 0; l < ASTEROIDS.length; l++) ASTEROIDS[l].update()
    for (let l = 0; l < DEATH_TARGETS.length; l++) DEATH_TARGETS[l].update()
    PROJECTILE.update()
    if (projectile.shoot) {
        if (getDistance(target.x, target.y, projectile.x, projectile.y) < (target.radius + projectile.radius)) {
            game.score++
            AUDIO.score.play()
            PROJECTILE.reconstruct()
            TARGET.reconstruct()
            for (let l = 0; l < DEATH_TARGETS.length; l++) DEATH_TARGETS[l].reconstruct()
        } else {
            for (var i = 0; i < death_targets.length; i++) {
                if (getDistance(death_targets[i].x, death_targets[i].y, projectile.x, projectile.y) < (death_targets[i].radius + projectile.radius)) {
                    ended = true
                    end_game()
                }
            }
        }
        if (getDistance(planet.x, planet.y, projectile.x, projectile.y) < (planet.radius + projectile.radius)) PROJECTILE.reconstruct()
    }
    if (!ended) {
        UFO.update()
        TARGET.update()
        PLANET.update()
        SCORE.update()
        if (pressed[37] || pressed[65]) UFO.left()
        if (pressed[39] || pressed[68]) UFO.right()
    }
}

function end_game() {
    convertSeconds(game.realtimer)
    high_score = localStorage.getItem("high score")
    if (parseInt(high_score) < game.score || high_score == null) {
        localStorage.setItem("high score", game.score.toString())
        higher_score = true
    } else {
        higher_score = false
    }
    redefine()
    AUDIO.music.pause()
    AUDIO.music.currentTime = 0
    AUDIO.end.play()
    game.play = false
    game.playing = false
    game_over_scene_menu()
}

document.addEventListener("keydown", e => {
    if (!game.play) return
    e = e || window.event
    pressed[e.keyCode] = true
})

document.addEventListener("keyup", e => {
    e = e || window.event
    if (!game.play) {
        if (e.keyCode != 13) return
        cancelAnimationFrame(starting_scene)
        cancelAnimationFrame(game_over_scene)
        start_game()
        AUDIO.start.play()
        AUDIO.music.play()
        return
    }
    delete pressed[e.keyCode]
    if (e.keyCode != 32) return
    if (projectile.shoot) return
    projectile.speed = 27
    projectile.shoot = true
})

document.addEventListener("visibilitychange", () => {
    if (!game.playing) return
    if (document.visibilityState == "visible") {
        game.play = true
        AUDIO.music.play()
        return
    }
    game.play = false
    AUDIO.music.pause()
})
