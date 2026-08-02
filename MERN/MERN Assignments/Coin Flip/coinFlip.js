/* -------------------------------------------------------------
   The original coin toss — unchanged from the assignment.
   Math.random() gives a decimal between 0 and 1, so the ternary
   splits it roughly 50/50 between heads and tails.
------------------------------------------------------------- */
function tossCoin() {
    return Math.random() > 0.5 ? "heads" : "tails";
}

/* -------------------------------------------------------------
   A safety limit. Five heads in a row takes about 62 flips on
   average, but it COULD go on forever. If we pass this many
   attempts we give up and reject instead.
   Lower this to about 10 to watch the .catch branch fire.
------------------------------------------------------------- */
const MAX_ATTEMPTS = 1000;

/* -------------------------------------------------------------
   The rewrite. Instead of looping until it's finished and making
   everything else wait, this returns a Promise straight away and
   reports the outcome later.
------------------------------------------------------------- */
function fiveHeads() {

    // The Promise is created immediately, but it starts PENDING —
    // we don't know yet whether it will resolve or reject.
    return new Promise( (resolve, reject) => {

        // these live out here so every flip can see and update them
        let headsCount = 0;
        let attempts = 0;

        // One flip per call. Instead of a while loop, this function
        // schedules the NEXT call of itself when it isn't done yet.
        const flip = () => {
            attempts++;

            const result = tossCoin();
            console.log(`${result} was flipped`);

            if (result === "heads") {
                // one step closer
                headsCount++;
            } else {
                // a tails breaks the streak, so start counting again
                headsCount = 0;
            }

            if (headsCount === 5) {
                // SUCCESS — hand the message to .then
                resolve(`It took ${attempts} tries to flip five "heads"`);

            } else if (attempts >= MAX_ATTEMPTS) {
                // FAILURE — hand the message to .catch
                reject(`Gave up after ${attempts} tries without five "heads" in a row`);

            } else {
                // NOT FINISHED — queue the next flip and let go of
                // the thread, so other code can run in the meantime
                setTimeout(flip, 0);
            }
        };

        // kick the whole thing off
        setTimeout(flip, 0);
    });
}

/* -------------------------------------------------------------
   Using it. fiveHeads() returns the pending Promise instantly,
   so these handlers are registered now and run later.
------------------------------------------------------------- */
fiveHeads()
    .then( res => console.log(res) )     // runs if resolve was called
    .catch( err => console.log(err) );   // runs if reject was called

// This is the whole point of the exercise — see where it appears
console.log("When does this run now?");