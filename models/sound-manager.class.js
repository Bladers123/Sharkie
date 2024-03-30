class SoundManager {
    sounds;
    constructor() {
        this.sounds = {};
    }

    addSound(name, src) {
        const audio = new Audio(src);
        this.sounds[name] = audio;
    }

    play(name, loop = false) {
        const sound = this.sounds[name];
        if (sound) {
            sound.loop = loop;
            sound.play();
        }
    }

    stop(name) {
        const sound = this.sounds[name];
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    stopAll() {
        for (let name in this.sounds) {
            this.stop(name);
        }
    }

     setVolume(name, volume) {
        if (this.sounds[name]) {
            this.sounds[name].volume = volume;
        }
    }

    setVolumeForAll(volume) {
        for (let name in this.sounds) {
            if (this.sounds.hasOwnProperty(name)) {
                this.sounds[name].volume = volume;
            }
        }
    }
}
