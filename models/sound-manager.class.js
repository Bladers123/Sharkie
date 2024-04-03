class SoundManager {
    sounds;
    soundPools;
    constructor() {
        this.sounds = {};
        this.soundPools = {};
    }

    addSound(name, path, count = 5) {
        if (!this.soundPools[name]) {
            this.soundPools[name] = [];
            for (let i = 0; i < count; i++) {
                const audio = new Audio(path);
                this.soundPools[name].push(audio);
            }
        }
    }

    play(name, loop = false) {
        const pool = this.soundPools[name];
        if (pool) {
            for (let sound of pool) {
                if (sound.paused) {
                    sound.loop = loop;
                    sound.play();
                    break;
                }
            }
        }
    }

    stop(name) {
        const pool = this.soundPools[name];
        if (pool) {
            for (let sound of pool) {
                sound.pause();
                sound.currentTime = 0; 
            }
        }
    }

    stopAll() {
        for (let name in this.soundPools) {
            if (this.soundPools.hasOwnProperty(name)) {
                const pool = this.soundPools[name];
                for (let sound of pool) {
                    sound.pause();
                    sound.currentTime = 0;
                }
            }
        }
    }
    

    setVolume(name, volume) {
        const pool = this.soundPools[name];
        if (pool) {
            for (let sound of pool) {
                sound.volume = volume;
            }
        }
    }
    

    setVolumeForAll(volume) {
        for (let name in this.soundPools) {
            if (this.soundPools.hasOwnProperty(name)) {
                const pool = this.soundPools[name];
                for (let sound of pool) {
                    sound.volume = volume;
                }
            }
        }
    }
    
}
