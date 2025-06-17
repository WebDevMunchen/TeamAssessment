require("dotenv").config();
const bcrypt = require("bcrypt");

const { MongoClient } = require("mongodb");

const uri = process.env.CONNECTION_STRING;
const dbName = "Team-Assessment";
const collectionName = "users";

const data = [
  { logInID: 102938, password: "eP76mJWL" },
  { logInID: 102947, password: "gQ38mLKE" },
  { logInID: 109384, password: "fA26rXMW" },
  { logInID: 128374, password: "vK76pDLC" },
  { logInID: 183947, password: "zR20cXYK" },
  { logInID: 192485, password: "eW39vMXR" },
  { logInID: 192837, password: "rW70tKVE" },
  { logInID: 193746, password: "gD91kMQL" },
  { logInID: 193847, password: "eT33vXLC" },
  { logInID: 203948, password: "wA71kMXT" },
  { logInID: 203968, password: "bP57nWVL" },
  { logInID: 209384, password: "cW78uBQZ" },
  { logInID: 210384, password: "mV73dLTC" },
  { logInID: 274839, password: "zY65pQMK" },
  { logInID: 293847, password: "jH20mTLC" },
  { logInID: 294756, password: "bN83oKXM" },
  { logInID: 294817, password: "qT39mLKP" },
  { logInID: 295837, password: "lA63nVME" },
  { logInID: 302948, password: "nV65dPLT" },
  { logInID: 304928, password: "uC85pMXR" },
  { logInID: 312948, password: "lE65pMJN" },
  { logInID: 374820, password: "cJ59tRMW" },
  { logInID: 374829, password: "mQ49pBXV" },
  { logInID: 374859, password: "lA93zVKW" },
  { logInID: 382910, password: "sL28pRWX" },
  { logInID: 382920, password: "yV52nMBK" },
  { logInID: 384656, password: "nC70xPLV" },
  { logInID: 384756, password: "rK70yQNV" },
  { logInID: 384902, password: "uQ65zJPL" },
  { logInID: 384920, password: "kH25mQLN" },
  { logInID: 394857, password: "lN58oTZW" },
  { logInID: 395860, password: "sE28mTRZ" },
  { logInID: 413829, password: "uQ92zBKT" },
  { logInID: 473889, password: "aD90yPQL" },
  { logInID: 473829, password: "vD29cMXZ" },
  { logInID: 475839, password: "aJ39sTXL" },
  { logInID: 482910, password: "nY70vBKL" },
  { logInID: 561738, password: "dT94vPXE" },
  { logInID: 563728, password: "bX74mZJL" },
  { logInID: 564729, password: "uT36vNXA" },
  { logInID: 564738, password: "hL74zDWC" },
  { logInID: 582830, password: "aH47rXVC" },
  { logInID: 582930, password: "kL49vNWT" },
  { logInID: 589102, password: "jC36rXLN" },
  { logInID: 589263, password: "kD95mTZP" },
  { logInID: 589731, password: "xL84mRCY" },
  { logInID: 589920, password: "rX43nBTQ" },
  { logInID: 638201, password: "vK84mJXP" },
  { logInID: 647281, password: "qH25pJKV" },
  { logInID: 647382, password: "fH29yMRP" },
  { logInID: 648392, password: "vW21kZQR" },
  { logInID: 657283, password: "kY63dPQR" },
  { logInID: 658392, password: "xR81oYPK" },
  { logInID: 672193, password: "tX84bJPO" },
  { logInID: 675820, password: "pA57kTQL" },
  { logInID: 682930, password: "zQ12oLYK" },
  { logInID: 726495, password: "jY71kWMB" },
  { logInID: 728394, password: "wT31yLKV" },
  { logInID: 728495, password: "dH38mYLC" },
  { logInID: 736182, password: "eP47rWZM" },
  { logInID: 736491, password: "nU30vKPL" },
  { logInID: 736492, password: "xH48tWQC" },
  { logInID: 746182, password: "sF84zKWP" },
  { logInID: 748291, password: "tL56yMWZ" },
  { logInID: 820394, password: "cE67oNTL" },
  { logInID: 829374, password: "mW60yNQR" },
  { logInID: 837161, password: "xY84nBDV" },
  { logInID: 843302, password: "mC58zPLD" },
  { logInID: 846362, password: "dY62oNKV" },
  { logInID: 847261, password: "hT41nXWO" },
  { logInID: 847263, password: "fA62rWLJ" },
  { logInID: 847362, password: "mU63zQNA" },
  { logInID: 849302, password: "cV78xNZM" },
  { logInID: 913374, password: "fL86yPQN" },
  { logInID: 913847, password: "zT92oNDW" },
  { logInID: 918203, password: "rT73nDLW" },
  { logInID: 918264, password: "bN62tXJQ" },
  { logInID: 918374, password: "sD95vKZN" },
  { logInID: 920384, password: "tL46kMZN" },
  { logInID: 948372, password: "wU52bNLD" },
  { logInID: 102838, password: "qR85nMLK" },
  { logInID: 946217, password: "qR11nMLK" },
  { logInID: 370918, password: "qR85nKKD" },
  { logInID: 302674, password: "qR85nnLK" },
  { logInID: 647925, password: "sR15nFLK" },
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
