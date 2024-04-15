/**
 * Manages sound effects for a game, allowing for multiple sounds to be played simultaneously and efficiently by using sound pools.
 */
class SoundManager {
    sounds;
    soundPools;

    /**
     * Initializes the SoundManager with empty containers for sound data.
     */
    constructor() {
        this.sounds = {};
        this.soundPools = {};
    }

    /**
     * Adds a sound to the manager and pre-loads multiple instances for concurrent playback.
     * @param {string} name - The name identifier for the sound.
     * @param {string} path - The path to the sound file.
     * @param {number} count - The number of instances to pre-load for this sound; defaults to 5.
     */
    addSound(name, path, count = 5) {
        if (!this.soundPools[name]) {
            this.soundPools[name] = [];
            for (let i = 0; i < count; i++) {
                const audio = new Audio(path);
                this.soundPools[name].push(audio);
            }
        }
    }

    /**
     * Plays a sound from the pool. If all instances are in use, it does not interrupt other instances.
     * @param {string} name - The name of the sound to play.
     * @param {boolean} loop - Whether the sound should loop continuously.
     */
    play(name, loop = false) {
        const pool = this.soundPools[name];
        if (pool) {
            for (let sound of pool) {
                if (sound.paused) {
                    sound.loop = loop;
                    sound.play().then(() => { }).catch(error => {
                        console.log("Folgender Fehler in play(): ", error);
                    });
                    break;
                }
            }
        }
    }

    /**
     * Stops all instances of a particular sound and resets their playback position.
     * @param {string} name - The name of the sound to stop.
     */
    stop(name) {
        const pool = this.soundPools[name];
        if (pool) {
            for (let sound of pool) {
                sound.pause();
                sound.currentTime = 0;
            }
        }
    }

    /**
     * Stops all sounds managed by the SoundManager and resets their playback position.
     */
    stopAll() {
        try {
            for (let name in this.soundPools) {
                if (this.soundPools.hasOwnProperty(name)) {
                    const pool = this.soundPools[name];
                    for (let sound of pool) {
                        sound.pause();
                        sound.currentTime = 0;
                    }
                }
            }
        } catch (error) {
            console.log("Folgender Fehler in stopAll(): ", error);
        }
    }

    /**
     * Sets the volume for all instances of a particular sound.
     * @param {string} name - The name of the sound for which to set the volume.
     * @param {number} volume - The volume level between 0.0 and 1.0.
     */
    setVolume(name, volume) {
        const pool = this.soundPools[name];
        if (pool) {
            for (let sound of pool) {
                sound.volume = volume;
            }
        }
    }

    /**
    * Sets the volume for all sounds managed by the SoundManager.
    * @param {number} volume - The volume level between 0.0 and 1.0 to apply to all sounds.
    */
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
