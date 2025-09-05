require("dotenv").config();
const bcrypt = require("bcrypt");

const { MongoClient } = require("mongodb");

const uri = process.env.CONNECTION_STRING;
const dbName = "Team-Assessment";
const collectionName = "users";

const data = [
  { logInID: 102391, password: "pX47mNQT" },
  { logInID: 104582, password: "vC63rLKW" },
  { logInID: 109823, password: "bR59nTXQ" },
  { logInID: 128945, password: "kT28xMQL" },
  { logInID: 139284, password: "sD71yPWN" },
  { logInID: 147392, password: "uQ65tKPL" },
  { logInID: 153829, password: "fW49zMRC" },
  { logInID: 162837, password: "jH92rQVK" },
  { logInID: 172930, password: "cV58tLQM" },
  { logInID: 183920, password: "yM37xBKL" },
  { logInID: 194837, password: "aD64vPRX" },
  { logInID: 203948, password: "nC85mTQL" },
  { logInID: 214839, password: "zK42wMLP" },
  { logInID: 225948, password: "qR73yXNT" },
  { logInID: 236748, password: "wE86mPLK" },
  { logInID: 248392, password: "kP37nTQL" },
  { logInID: 259384, password: "rX85tNVC" },
  { logInID: 263849, password: "mD47zKTP" },
  { logInID: 274930, password: "xW56qLNZ" },
  { logInID: 285749, password: "hT29rMWQ" },
  { logInID: 296481, password: "bK84tNQP" },
  { logInID: 307492, password: "jP61mTRX" },
  { logInID: 318274, password: "dC43vKWZ" },
  { logInID: 329184, password: "uM95yPLQ" },
  { logInID: 340192, password: "aV27tMRC" },
  { logInID: 351829, password: "yH46kNQT" },
  { logInID: 362940, password: "fQ93mTPL" },
  { logInID: 374819, password: "nX75wMRP" },
  { logInID: 385920, password: "zC52yKPL" },
  { logInID: 396182, password: "gR84nLQT" },
  { logInID: 407291, password: "kM29rPXL" },
  { logInID: 418392, password: "tW73nRMC" },
  { logInID: 429384, password: "hJ64vQNP" },
  { logInID: 439284, password: "mP57xLQT" },
  { logInID: 452819, password: "cD92tMKW" },
  { logInID: 463920, password: "qH38yPLN" },
  { logInID: 475829, password: "jV65nKQT" },
  { logInID: 486193, password: "uR41mTXL" },
  { logInID: 497382, password: "sC89pMWT" },
  { logInID: 508293, password: "xT35qKPL" },
  { logInID: 519384, password: "rP72nLQM" },
  { logInID: 528374, password: "bM93tXWP" },
  { logInID: 536281, password: "fK64vNRT" },
  { logInID: 548392, password: "hW27yMQN" },
  { logInID: 559384, password: "gQ91mLKT" },
  { logInID: 563829, password: "kT45wPQL" },
  { logInID: 574839, password: "zC87xMWP" },
  { logInID: 585920, password: "mR36qNVT" },
  { logInID: 596102, password: "pH82tLQP" },
  { logInID: 607193, password: "vM47kPRX" },
  { logInID: 618394, password: "nC65zLQT" },
  { logInID: 629485, password: "uJ83mKLP" },
  { logInID: 640291, password: "yD49rTQN" },
  { logInID: 651382, password: "sP73xMWK" },
  { logInID: 662493, password: "bT26vQLP" },
  { logInID: 673584, password: "cM54yNRT" },
  { logInID: 684920, password: "aX72tPLQ" },
  { logInID: 695831, password: "qR83nMWZ" },
  { logInID: 706492, password: "kP27mTQL" },
  { logInID: 718293, password: "dW62yKNP" },
  { logInID: 729384, password: "jC75xQLM" },
  { logInID: 740192, password: "lT28rMNP" },
  { logInID: 751283, password: "oM91tQKL" },
  { logInID: 762394, password: "eR36nPWT" },
  { logInID: 773829, password: "vH54yQLP" },
  { logInID: 784920, password: "mD29rNQT" },
  { logInID: 795382, password: "sJ85pMWL" },
  { logInID: 806291, password: "gC41kPLN" },
  { logInID: 817394, password: "yP74mQXT" },
  { logInID: 829485, password: "nT52vLQM" },
  { logInID: 840192, password: "uR93zMKL" },
  { logInID: 851283, password: "pW64tNQP" },
  { logInID: 862394, password: "cJ47mTQL" },
  { logInID: 873829, password: "hV81nLQP" },
  { logInID: 884920, password: "zC36yMWT" },
  { logInID: 895382, password: "qT29rPLK" },
  { logInID: 906291, password: "xM72nQPL" },
  { logInID: 917394, password: "tR58wNKM" },
  { logInID: 928485, password: "aH64tQLN" },
  { logInID: 939284, password: "fP82mKQT" },
  { logInID: 950192, password: "lC47yNWM" },
  { logInID: 961283, password: "bT95rQLN" },
  { logInID: 972394, password: "dM36nPLQ" },
  { logInID: 983829, password: "kR28tMWP" },
  { logInID: 994920, password: "sW72yKQL" },
];

async function insertData() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const saltRounds = 10;
    const usersWithHashedPasswords = await Promise.all(
      data.map(async (user) => {
        const hashedPassword = await bcrypt.hash(user.password, saltRounds);
        return {
          logInID: user.logInID,
          password: hashedPassword,
          role: "user",
        };
      })
    );

    const result = await collection.insertMany(usersWithHashedPasswords);
    console.log(`🚀 Successfully inserted ${result.insertedCount} users`);
  } catch (error) {
    console.error("❌ Error inserting data:", error);
  } finally {
    await client.close();
  }
}

insertData();
