const anchor = require("@project-serum/anchor");

const { SystemProgram } = anchor.web3;

const main = async () => {
  console.log("🚀 Starting test...");

  const provider = anchor.Provider.env();
  anchor.setProvider(provider);
  const program = anchor.workspace.Myepicproject;
  // Create an account keypair for our program to use.
  const baseAccount = anchor.web3.Keypair.generate();
  // Call start_stuff_off, pass it the params it needs!
  let tx = await program.rpc.startStuffOff({
    accounts: {
      baseAccount: baseAccount.publicKey,
      user: provider.wallet.publicKey,
      systemProgram: SystemProgram.programId,
    },
    signers: [baseAccount],
  });
  console.log("📝 Your transaction signature", tx);
  // Fetch data from the account.
  let account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log("👀 MEME Count", account.totalGifs.toString());

  // You'll need to now pass a GIF link to the function!
  await program.rpc.addGif("https://media.giphy.com/media/lOrNA1OyRURmBdoPbf/giphy.gif", {
    accounts: {
      baseAccount: baseAccount.publicKey,
    },
  });
  
  // Call the account.
  account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  console.log('👀 MEME Count', account.totalGifs.toString())

  // Access gif_list on the account!
  console.log('👀 MEME List', account.gifList)
};

const runMain = async () => {
  try {
    await main();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

runMain();
