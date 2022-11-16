MODULES["other"] = {};
MODULES["other"].enableRoboTrimpSpam = true;
var prestraid = !1, dprestraid = !1, failpraid = !1, dfailpraid = !1, bwraided = !1, dbwraided = !1, failbwraid = !1, dfailbwraid = !1, perked = !1, prestraidon = !1, dprestraidon = !1, mapbought = !1, dmapbought = !1, bwraidon = !1, dbwraidon = !1, presteps = null, minMaxMapCost, fMap, pMap, shouldFarmFrags = !1, praidDone = !1;
function armydeath() { if (game.global.mapsActive) return !1; var e = game.global.lastClearedCell + 1, l = game.global.gridArray[e].attack * dailyModifiers.empower.getMult(game.global.dailyChallenge.empower.strength, game.global.dailyChallenge.empower.stacks) * game.portal.Equality.getMult(), a = game.global.soldierHealth + game.global.soldierEnergyShield * (Fluffy.isRewardActive('shieldlayer') ? ((1 + Fluffy.isRewardActive('shieldlayer'))) : 1); "Ice" == getEmpowerment() && (l *= game.empowerments.Ice.getCombatModifier()); var g = game.global.soldierCurrentBlock; return 3 == game.global.formation ? g /= 4 : "0" != game.global.formation && (g *= 2), g > game.global.gridArray[e].attack ? l *= getPierceAmt() : l -= g * (1 - getPierceAmt()), "Daily" == game.global.challengeActive && void 0 !== game.global.dailyChallenge.crits && (l *= dailyModifiers.crits.getMult(game.global.dailyChallenge.crits.strength)), void 0 !== game.global.dailyChallenge.bogged && (a -= game.global.soldierHealthMax * dailyModifiers.bogged.getMult(game.global.dailyChallenge.bogged.strength)), void 0 !== game.global.dailyChallenge.plague && (a -= game.global.soldierHealthMax * dailyModifiers.plague.getMult(game.global.dailyChallenge.plague.strength, game.global.dailyChallenge.plague.stacks)), "Electricity" == game.global.challengeActive && (a -= game.global.soldierHealth -= game.global.soldierHealthMax * (.1 * game.challenges.Electricity.stacks)), "corruptCrit" == game.global.gridArray[e].corrupted ? l *= 5 : "healthyCrit" == game.global.gridArray[e].corrupted ? l *= 7 : "corruptBleed" == game.global.gridArray[e].corrupted ? a *= .8 : "healthyBleed" == game.global.gridArray[e].corrupted && (a *= .7), (a -= l) <= 1e3 }
function autoRoboTrimp() { if (!(0 < game.global.roboTrimpCooldown) && game.global.roboTrimpLevel) { var a = parseInt(getPageSetting("AutoRoboTrimp")); 0 == a || game.global.world >= a && !game.global.useShriek && (magnetoShriek(), MODULES.other.enableRoboTrimpSpam && debug("Activated Robotrimp MagnetoShriek Ability @ z" + game.global.world, "graphs", "*podcast")) } }
function isBelowThreshold(a) { return a != game.global.world }
function buyWeps() { if (!((getPageSetting('BuyWeaponsNew') == 1) || (getPageSetting('BuyWeaponsNew') == 3))) return; preBuy(), game.global.buyAmt = getPageSetting('gearamounttobuy'), game.equipment.Dagger.level < getPageSetting('CapEquip2') && canAffordBuilding('Dagger', null, null, !0) && buyEquipment('Dagger', !0, !0), game.equipment.Mace.level < getPageSetting('CapEquip2') && canAffordBuilding('Mace', null, null, !0) && buyEquipment('Mace', !0, !0), game.equipment.Polearm.level < getPageSetting('CapEquip2') && canAffordBuilding('Polearm', null, null, !0) && buyEquipment('Polearm', !0, !0), game.equipment.Battleaxe.level < getPageSetting('CapEquip2') && canAffordBuilding('Battleaxe', null, null, !0) && buyEquipment('Battleaxe', !0, !0), game.equipment.Greatsword.level < getPageSetting('CapEquip2') && canAffordBuilding('Greatsword', null, null, !0) && buyEquipment('Greatsword', !0, !0), !game.equipment.Arbalest.locked && game.equipment.Arbalest.level < getPageSetting('CapEquip2') && canAffordBuilding('Arbalest', null, null, !0) && buyEquipment('Arbalest', !0, !0), postBuy() }
function buyArms() { if (!((getPageSetting('BuyArmorNew') == 1) || (getPageSetting('BuyArmorNew') == 3))) return; preBuy(), game.global.buyAmt = 10, game.equipment.Shield.level < getPageSetting('CapEquiparm') && canAffordBuilding('Shield', null, null, !0) && buyEquipment('Shield', !0, !0), game.equipment.Boots.level < getPageSetting('CapEquiparm') && canAffordBuilding('Boots', null, null, !0) && buyEquipment('Boots', !0, !0), game.equipment.Helmet.level < getPageSetting('CapEquiparm') && canAffordBuilding('Helmet', null, null, !0) && buyEquipment('Helmet', !0, !0), game.equipment.Pants.level < getPageSetting('CapEquiparm') && canAffordBuilding('Pants', null, null, !0) && buyEquipment('Pants', !0, !0), game.equipment.Shoulderguards.level < getPageSetting('CapEquiparm') && canAffordBuilding('Shoulderguards', null, null, !0) && buyEquipment('Shoulderguards', !0, !0), game.equipment.Breastplate.level < getPageSetting('CapEquiparm') && canAffordBuilding('Breastplate', null, null, !0) && buyEquipment('Breastplate', !0, !0), !game.equipment.Gambeson.locked && game.equipment.Gambeson.level < getPageSetting('CapEquiparm') && canAffordBuilding('Gambeson', null, null, !0) && buyEquipment('Gambeson', !0, !0), postBuy() }
function isActiveSpireAT() { return game.global.challengeActive != 'Daily' && game.global.spireActive && game.global.world >= getPageSetting('IgnoreSpiresUntil') }
function disActiveSpireAT() { return game.global.challengeActive == 'Daily' && game.global.spireActive && game.global.world >= getPageSetting('dIgnoreSpiresUntil') }
function exitSpireCell() { isActiveSpireAT() && game.global.lastClearedCell >= getPageSetting('ExitSpireCell') - 1 && endSpire() }
function dailyexitSpireCell() { disActiveSpireAT() && game.global.lastClearedCell >= getPageSetting('dExitSpireCell') - 1 && endSpire() }
function plusPres() { document.getElementById("biomeAdvMapsSelect").value = "Random", document.getElementById("advExtraLevelSelect").value = plusMapToRun(game.global.world), document.getElementById("advSpecialSelect").value = "p", document.getElementById("lootAdvMapsRange").value = 0, document.getElementById("difficultyAdvMapsRange").value = 9, document.getElementById("sizeAdvMapsRange").value = 9, document.getElementById("advPerfectCheckbox").dataset.checked = !1, document.getElementById("mapLevelInput").value = game.global.world, updateMapCost() }
function plusMapToRun(a) { return 9 == a % 10 ? 6 : 5 > a % 10 ? 5 - a % 10 : 11 - a % 10 }
function findLastBionic() { for (var a = game.global.mapsOwnedArray.length - 1; 0 <= a; a--)if ("Bionic" === game.global.mapsOwnedArray[a].location) return game.global.mapsOwnedArray[a] }
function helptrimpsnotdie() { if (!game.global.preMapsActive && !game.global.fighting) buyArms(); }
function usedaily3() { !0 != getPageSetting('use3daily') || 'Daily' != game.global.challengeActive || daily3 || (daily3 = !0), !1 == getPageSetting('use3daily') && 'Daily' != game.global.challengeActive && daily3 && (daily3 = !1), !0 == getPageSetting('use3daily') && 'Daily' != game.global.challengeActive && daily3 && (daily3 = !1) }
function buyshitspire() { !0 == getPageSetting('spireshitbuy') && game.global.spireActive && game.global.world >= getPageSetting('IgnoreSpiresUntil') && (buyWeps(), buyArms()) }

//Helium

function autoGoldenUpgradesAT(setting) {
	var num = getAvailableGoldenUpgrades();
	var setting2;
	if (num == 0) return;
	if (setting == "Helium")
		setting2 = "Helium";
	if ((!game.global.dailyChallenge.seed && !game.global.runningChallengeSquared && autoTrimpSettings.AutoGoldenUpgrades.selected == "Helium" && getPageSetting('radonbattle') > 0 && game.goldenUpgrades.Helium.purchasedAt.length >= getPageSetting('radonbattle')) || (game.global.dailyChallenge.seed && autoTrimpSettings.dAutoGoldenUpgrades.selected == "Helium" && getPageSetting('dradonbattle') > 0 && game.goldenUpgrades.Helium.purchasedAt.length >= getPageSetting('dradonbattle')))
		setting2 = "Battle";
	if (setting == "Battle")
		setting2 = "Battle";
	if ((!game.global.dailyChallenge.seed && !game.global.runningChallengeSquared && autoTrimpSettings.AutoGoldenUpgrades.selected == "Battle" && getPageSetting('battleradon') > 0 && game.goldenUpgrades.Battle.purchasedAt.length >= getPageSetting('battleradon')) || (game.global.dailyChallenge.seed && autoTrimpSettings.dAutoGoldenUpgrades.selected == "Battle" && getPageSetting('dbattleradon') > 0 && game.goldenUpgrades.Battle.purchasedAt.length >= getPageSetting('dbattleradon')))
		setting2 = "Helium";
	if (setting == "Void" || setting == "Void + Battle")
		setting2 = "Void";
	var success = buyGoldenUpgrade(setting2);
	if (!success && setting2 == "Void") {
		num = getAvailableGoldenUpgrades();
		if (num == 0) return;
		if ((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void" && !game.global.dailyChallenge.seed && !game.global.runningChallengeSquared) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void" && game.global.dailyChallenge.seed))
			setting2 = "Helium";
		if (((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void" && getPageSetting('voidheliumbattle') > 0 && game.global.world >= getPageSetting('voidheliumbattle')) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void" && getPageSetting('dvoidheliumbattle') > 0 && game.global.world >= getPageSetting('dvoidheliumbattle'))) || ((autoTrimpSettings.AutoGoldenUpgrades.selected == "Void + Battle" && !game.global.dailyChallenge.seed && !game.global.runningChallengeSquared) || (autoTrimpSettings.dAutoGoldenUpgrades.selected == "Void + Battle" && game.global.dailyChallenge.seed) || (autoTrimpSettings.cAutoGoldenUpgrades.selected == "Void + Battle" && game.global.runningChallengeSquared)))
			setting2 = "Battle";
		buyGoldenUpgrade(setting2);
	}
}

function relaxMapReqs(mapModifiers) {
	for (var j = 0; j < mapModifiers.length; j++) {
		document.getElementById('sizeAdvMapsRange').value = 9;
		document.getElementById('advSpecialSelect').value = mapModifiers[j];
		for (var i = 9; i >= 0; i--) {
			document.getElementById('difficultyAdvMapsRange').value = i;
			if (updateMapCost(true) <= game.resources.fragments.owned) return true;
		}
		for (i = 9; i >= 0; i--) {
			document.getElementById('sizeAdvMapsRange').value = i;
			if (updateMapCost(true) <= game.resources.fragments.owned) return true;
		}
	}
	return false;
}
function trimpcide() {
	if (game.portal.Anticipation.level > 0) {
		var antistacklimit = (game.talents.patience.purchased) ? 45 : 30;
		if (game.global.fighting && ((game.jobs.Amalgamator.owned > 0) ? Math.floor((new Date().getTime() - game.global.lastSoldierSentAt) / 1000) : Math.floor(game.global.lastBreedTime / 1000)) >= antistacklimit && (game.global.antiStacks < antistacklimit || antistacklimit == 0 && game.global.antiStacks >= 1) && !game.global.spireActive)
			forceAbandonTrimps();
		if (game.global.fighting && ((game.jobs.Amalgamator.owned > 0) ? Math.floor((new Date().getTime() - game.global.lastSoldierSentAt) / 1000) : Math.floor(game.global.lastBreedTime / 1000)) >= antistacklimit && game.global.antiStacks < antistacklimit && game.global.mapsActive) {
			if (getCurrentMapObject().location == "Void") {
				abandonVoidMap();
			}
		}
	}
}

function avoidempower() {
	if (game.global.universe == 1 && armydeath()) {
		if (typeof game.global.dailyChallenge.bogged === 'undefined' && typeof game.global.dailyChallenge.plague === 'undefined') {
			mapsClicked(true);
			return;
		}
	}
}

var spirebreeding = false;
function ATspirebreed() {
	if (!spirebreeding && getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && game.global.spireActive)
		var prespiretimer = game.global.GeneticistassistSetting;
	if (getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && game.global.spireActive && game.global.GeneticistassistSetting != getPageSetting('SpireBreedTimer')) {
		spirebreeding = true;
		if (game.global.GeneticistassistSetting != getPageSetting('SpireBreedTimer'))
			game.global.GeneticistassistSetting = getPageSetting('SpireBreedTimer');
	}
	if (getPageSetting('SpireBreedTimer') > 0 && getPageSetting('IgnoreSpiresUntil') <= game.global.world && !game.global.spireActive && game.global.GeneticistassistSetting == getPageSetting('SpireBreedTimer')) {
		spirebreeding = false;
		if (game.global.GeneticistassistSetting == getPageSetting('SpireBreedTimer')) {
			game.global.GeneticistassistSetting = prespiretimer;
			toggleGeneticistassist();
			toggleGeneticistassist();
			toggleGeneticistassist();
			toggleGeneticistassist();
		}
	}
}

function fightalways() {
	if (game.global.gridArray.length === 0 || game.global.preMapsActive || !game.upgrades.Battle.done || game.global.fighting || (game.global.spireActive && game.global.world >= getPageSetting('IgnoreSpiresUntil')))
		return;
	if (!game.global.fighting)
		fightManual();
}

function armormagic() {
	var armormagicworld = Math.floor((game.global.highestLevelCleared + 1) * 0.8);
	if (((getPageSetting('carmormagic') == 1 || getPageSetting('darmormagic') == 1) && game.global.world >= armormagicworld && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)) || ((getPageSetting('carmormagic') == 2 || getPageSetting('darmormagic') == 2) && calcHDratio() >= MODULES["maps"].enoughDamageCutoff && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)) || ((getPageSetting('carmormagic') == 3 || getPageSetting('darmormagic') == 3) && (game.global.soldierHealth <= game.global.soldierHealthMax * 0.4)))
		buyArms();
}

trapIndexs = ["", "Fire", "Frost", "Poison", "Lightning", "Strength", "Condenser", "Knowledge"];

function tdStringCode2() {
	var thestring = document.getElementById('importBox').value.replace(/\s/g, '');
	var s = new String(thestring);
	var index = s.indexOf("+", 0);
	s = s.slice(0, index);
	var length = s.length;

	var saveLayout = [];
	for (var i = 0; i < length; i++) {
		saveLayout.push(trapIndexs[s.charAt(i)]);
	}
	playerSpire['savedLayout' + -1] = saveLayout;

	if ((playerSpire.runestones + playerSpire.getCurrentLayoutPrice()) < playerSpire.getSavedLayoutPrice(-1)) return false;
	playerSpire.resetTraps();
	for (var x = 0; x < saveLayout.length; x++) {
		if (!saveLayout[x]) continue;
		playerSpire.buildTrap(x, saveLayout[x]);
	}
}

var oldPlayerSpireDrawInfo = playerSpire.drawInfo;
playerSpire.drawInfo = function (arguments) {
	var ret = oldPlayerSpireDrawInfo.apply(this, arguments);
	var elem = document.getElementById('spireTrapsWindow');
	if (!elem) return arguments;
	var importBtn = "<div onclick='ImportExportTooltip(\"spireImport\")' class='spireControlBox'>Import</div>";
	elem.innerHTML = importBtn + elem.innerHTML;
	return arguments;
}

//Radon
function questcheck() {
	if (game.global.challengeActive !== 'Quest' || game.global.world < game.challenges.Quest.getQuestStartZone() || !getPageSetting('rQuest'))
		return 0;
	var questnotcomplete = game.challenges.Quest.getQuestProgress() != "Quest Complete!";
	if (game.challenges.Quest.getQuestProgress() == "Failed!") return 0;
	//Resource multipliers
	else if (game.challenges.Quest.getQuestDescription().includes("food") && questnotcomplete) return 1;
	else if (game.challenges.Quest.getQuestDescription().includes("wood") && questnotcomplete) return 2;
	else if (game.challenges.Quest.getQuestDescription().includes("metal") && questnotcomplete) return 3;
	else if (game.challenges.Quest.getQuestDescription().includes("gems") && questnotcomplete) return 4;
	else if (game.challenges.Quest.getQuestDescription().includes("science") && questnotcomplete) return 5;
	//Everything else
	else if (game.challenges.Quest.getQuestDescription() == "Complete 5 Maps at Zone level" && questnotcomplete) return 6;
	else if (game.challenges.Quest.getQuestDescription() == "One-shot 5 world enemies" && questnotcomplete) return 7;
	else if (game.challenges.Quest.getQuestDescription() == "Don't let your shield break before Cell 100" && questnotcomplete) return 8;
	else if (game.challenges.Quest.getQuestDescription() == "Don't run a map before Cell 100") return 9;
	else if (game.challenges.Quest.getQuestDescription() == "Buy a Smithy" && questnotcomplete) return 10;
	else return 0;
}

function archstring() {
	if (!getPageSetting('Rarchon')) return;
	if (getPageSetting('Rarchstring1') != "undefined" && getPageSetting('Rarchstring2') != "undefined" && getPageSetting('Rarchstring3') != "undefined") {
		var string1 = getPageSetting('Rarchstring1'), string2 = getPageSetting('Rarchstring2'), string3 = getPageSetting('Rarchstring3');
		var string1z = string1.split(',')[0], string2z = string2.split(',')[0];
		var string1split = string1.split(',').slice(1).toString(), string2split = string2.split(',').slice(1).toString();
		if (game.global.world <= string1z && game.global.archString != string1split) game.global.archString = string1split;
		if (game.global.world > string1z && game.global.world <= string2z && game.global.archString != string2split) game.global.archString = string2split;
		if (game.global.world > string2z && game.global.archString != string3) game.global.archString = string3;
	}
}

function radonChallengesSetting() {
	var radonHZE = game.global.highestRadonLevelCleared + 1;
	var radonChallenges = ["Off", "Radon Per Hour"];
	if (radonHZE >= 40) radonChallenges.push("Bublé");
	if (radonHZE >= 55) radonChallenges.push("Melt");
	if (radonHZE >= 70) radonChallenges.push("Quagmire");
	if (radonHZE >= 90) radonChallenges.push("Archaeology");
	if (radonHZE >= 100) radonChallenges.push("Mayhem");
	if (radonHZE >= 110) radonChallenges.push("Insanity");
	if (radonHZE >= 135) radonChallenges.push("Nurture");
	if (radonHZE >= 150) radonChallenges.push("Pandemonium");
	if (radonHZE >= 155) radonChallenges.push("Alchemy");
	if (radonHZE >= 175) radonChallenges.push("Hypothermia");
	radonChallenges.push("Custom");
	if (radonHZE >= 50) radonChallenges.push("Challenge 3");

	document.getElementById('RAutoPortal').innerHTML = ''
	for (var item in radonChallenges) {
		var option = document.createElement("option");
		option.value = radonChallenges[item];
		option.text = radonChallenges[item];
		document.getElementById('RAutoPortal').appendChild(option);
	}

	var radonHourChallenges = ["None"];
	if (radonHZE >= 40) radonHourChallenges.push("Bublé");
	if (radonHZE >= 55) radonHourChallenges.push("Melt");
	if (radonHZE >= 70) radonHourChallenges.push("Quagmire");
	if (radonHZE >= 90) radonHourChallenges.push("Archaeology");
	if (radonHZE >= 110) radonHourChallenges.push("Insanity");
	if (radonHZE >= 135) radonHourChallenges.push("Nurture");
	if (radonHZE >= 155) radonHourChallenges.push("Alchemy");
	if (radonHZE >= 175) radonHourChallenges.push("Hypothermia");

	document.getElementById('RadonHourChallenge').innerHTML = ''
	for (var item in radonHourChallenges) {
		var option = document.createElement("option");
		option.value = radonHourChallenges[item];
		option.text = radonHourChallenges[item];
		document.getElementById('RadonHourChallenge').appendChild(option);
	}

	var radonChallenge3 = ["None"];
	if (radonHZE >= 15) radonChallenge3.push("Unlucky");
	if (radonHZE >= 20) radonChallenge3.push("Downsize");
	if (radonHZE >= 25) radonChallenge3.push("Transmute");
	if (radonHZE >= 35) radonChallenge3.push("Unbalance");
	if (radonHZE >= 45) radonChallenge3.push("Duel");
	if (radonHZE >= 60) radonChallenge3.push("Trappapalooza");
	if (radonHZE >= 70) radonChallenge3.push("Wither");
	if (radonHZE >= 85) radonChallenge3.push("Quest");
	if (radonHZE >= 105) radonChallenge3.push("Storm");
	if (radonHZE >= 115) radonChallenge3.push("Berserk");
	if (radonHZE >= 175) radonChallenge3.push("Glass");

	document.getElementById('RadonC3Challenge').innerHTML = ''
	for (var item in radonChallenge3) {
		var option = document.createElement("option");
		option.value = radonChallenge3[item];
		option.text = radonChallenge3[item];
		document.getElementById('RadonC3Challenge').appendChild(option);
	}

	//if (radonHZE === 15) debug("You have unlocked the Unlucky challenge.")
	if (radonHZE === 5) debug("You can now use the Smithy Farm setting. This can be found in the AT 'Maps' tab.")
	if (radonHZE === 25) debug("You have unlocked the Transmute challenge. Any metal related settings will be converted to food instead while running this challenge.")
	if (radonHZE === 30) debug("You can now access the Daily tab within the AT settings. Here you will find a variety of settings that will help optimise your dailies.")
	if (radonHZE === 35) debug("You have unlocked the Unbalance challenge. There's setting for it in the AT 'C3' tab.")
	if (radonHZE === 40) debug("You have unlocked the Bublé challenge. It has now been added to AutoPortal setting.")
	//if (radonHZE === 45) debug("Duel");
	if (radonHZE === 50) debug("You can now use the Worshipper Farm setting. This can be found in the AT 'Maps' tab.")
	if (radonHZE === 50) debug("You can now access the C3 tab within the AT settings. Here you will find a variety of settings that will help optimise your C3 runs.")
	if (radonHZE === 50) debug("Due to unlocking Challenge 3's there is now a Challenge 3 option under AutoPortal to be able to auto portal into them.");
	if (radonHZE === 50) debug("You have unlocked the Melt challenge. It has now been added to AutoPortal setting.")
	if (radonHZE === 60) debug("You have unlocked the Trappapalooza challenge. It has now been added to Challenge 3 AutoPortal settings & there's a setting for it in the AT 'C3' tab.")
	if (radonHZE === 70) debug("You have unlocked the Quagmire challenge. It has now been added to AutoPortal setting & there are settings for it in the AT 'Challenges' tab.")
	if (radonHZE === 70) debug("You have unlocked the Wither challenge. It has now been added to Challenge 3 AutoPortal settings & any map level settings with the exception of Map Bonus will make the highest level map you run -1 to not obtain additional stacks.")
	if (radonHZE === 85) debug("You have unlocked the Quest challenge. It has now been added to Challenge 3 AutoPortal settings & AT will automatically complete Quests if AutoMaps is enabled during this challenge.")
	if (radonHZE === 90) debug("You have unlocked the Archaeology challenge. It has now been added to AutoPortal setting & there are settings for it in the AT 'Challenges' tab.")
	if (radonHZE === 100) debug("You have unlocked the Mayhem challenge. It has now been added to AutoPortal setting & there's setting for it in the AT 'C3' tab.")
	if (radonHZE === 105) debug("You have unlocked the Storm challenge. It has now been added to Challenge 3 AutoPortal setting & there's setting for it in the AT 'C3' tab.")
	if (radonHZE === 110) debug("You have unlocked the Insanity challenge. It has now been added to AutoPortal setting & there are settings for it in the AT 'Challenges' tab.")
	if (radonHZE === 115) debug("You have unlocked the Berserk challenge. It has now been added to Challenge 3 AutoPortal setting.")
	if (radonHZE === 135) debug("You have unlocked the Nurture challenge. It has now been added to AutoPortal setting & there is a setting for Laboratory's that has been added to AT's AutoStructure setting.")
	if (radonHZE === 150) debug("You have unlocked the Pandemonium challenge. It has now been added to AutoPortal setting & there's setting for it in the AT 'C3' tab.")
	if (radonHZE === 155) debug("You have unlocked the Alchemy challenge. It has now been added to AutoPortal setting & there are settings for it in the AT 'Challenges' tab.")
	if (radonHZE === 175) debug("You have unlocked the Hypothermia challenge. It has now been added to AutoPortal setting & there are settings for it in the AT 'Challenges' tab.")
	if (radonHZE === 175) debug("You have unlocked the Glass challenge. It has now been added to Challenge 3 AutoPortal setting.")
}

function challengeListSetting() {
	var highestZone = game.global.highestRadonLevelCleared + 1;
	var challengeList = ["Off", "Radon Per Hour"];
	if (highestZone >= 40) challengeList.push("Bublé");
	if (highestZone >= 55) challengeList.push("Melt");
	if (highestZone >= 70) challengeList.push("Quagmire");
	if (highestZone >= 90) challengeList.push("Archaeology");
	if (highestZone >= 100) challengeList.push("Mayhem");
	if (highestZone >= 110) challengeList.push("Insanity");
	if (highestZone >= 135) challengeList.push("Nurture");
	if (highestZone >= 150) challengeList.push("Pandemonium");
	if (highestZone >= 155) challengeList.push("Alchemy");
	if (highestZone >= 175) challengeList.push("Hypothermia");
	challengeList.push("Custom");
	if (highestZone >= 50) challengeList.push("Challenge 3");

	document.getElementById('RAutoPortal').innerHTML = ''
	for (var item in challengeList) {
		var option = document.createElement("option");
		option.value = challengeList[item];
		option.text = challengeList[item];
		document.getElementById('RAutoPortal').appendChild(option);
	}

	var radonHourChallenges = ["None"];
	if (highestZone >= 40) radonHourChallenges.push("Bublé");
	if (highestZone >= 55) radonHourChallenges.push("Melt");
	if (highestZone >= 70) radonHourChallenges.push("Quagmire");
	if (highestZone >= 90) radonHourChallenges.push("Archaeology");
	if (highestZone >= 110) radonHourChallenges.push("Insanity");
	if (highestZone >= 135) radonHourChallenges.push("Nurture");
	if (highestZone >= 155) radonHourChallenges.push("Alchemy");
	if (highestZone >= 175) radonHourChallenges.push("Hypothermia");

	document.getElementById('RadonHourChallenge').innerHTML = ''
	for (var item in radonHourChallenges) {
		var option = document.createElement("option");
		option.value = radonHourChallenges[item];
		option.text = radonHourChallenges[item];
		document.getElementById('RadonHourChallenge').appendChild(option);
	}

	var challengeList = ["None"];
	if (highestZone >= 15) challengeList.push("Unlucky");
	if (highestZone >= 20) challengeList.push("Downsize");
	if (highestZone >= 25) challengeList.push("Transmute");
	if (highestZone >= 35) challengeList.push("Unbalance");
	if (highestZone >= 45) challengeList.push("Duel");
	if (highestZone >= 60) challengeList.push("Trappapalooza");
	if (highestZone >= 70) challengeList.push("Wither");
	if (highestZone >= 85) challengeList.push("Quest");
	if (highestZone >= 105) challengeList.push("Storm");
	if (highestZone >= 115) challengeList.push("Berserk");
	if (highestZone >= 175) challengeList.push("Glass");

	document.getElementById('RadonC3Challenge').innerHTML = ''
	for (var item in challengeList) {
		var option = document.createElement("option");
		option.value = challengeList[item];
		option.text = challengeList[item];
		document.getElementById('RadonC3Challenge').appendChild(option);
	}

	//if (highestZone === 15) debug("You have unlocked the Unlucky challenge.")
	if (highestZone === 5) debug("You can now use the Smithy Farm setting. This can be found in the AT 'Maps' tab.")
	if (highestZone === 25) debug("You have unlocked the Transmute challenge. Any metal related settings will be converted to food instead while running this challenge.")
	if (highestZone === 30) debug("You can now access the Daily tab within the AT settings. Here you will find a variety of settings that will help optimise your dailies.")
	if (highestZone === 35) debug("You have unlocked the Unbalance challenge. There's setting for it in the AT 'C3' tab.")
	if (highestZone === 40) debug("You have unlocked the Bublé challenge. It has now been added to AutoPortal setting.")
	//if (highestZone === 45) debug("Duel");
	if (highestZone === 50) debug("You can now use the Worshipper Farm setting. This can be found in the AT 'Maps' tab.")
	if (highestZone === 50) debug("You can now access the C3 tab within the AT settings. Here you will find a variety of settings that will help optimise your C3 runs.")
	if (highestZone === 50) debug("Due to unlocking Challenge 3's there is now a Challenge 3 option under AutoPortal to be able to auto portal into them.");
	if (highestZone === 50) debug("You have unlocked the Melt challenge. It has now been added to AutoPortal setting.")
	if (highestZone === 60) debug("You have unlocked the Trappapalooza challenge. It has now been added to Challenge 3 AutoPortal settings & there's a setting for it in the AT 'C3' tab.")
	if (highestZone === 70) debug("You have unlocked the Quagmire challenge. It has now been added to AutoPortal setting & there are settings for it in the AT 'Challenges' tab.")
	if (highestZone === 70) debug("You have unlocked the Wither challenge. It has now been added to Challenge 3 AutoPortal settings & any map level settings with the exception of Map Bonus will make the highest level map you run -1 to not obtain additional stacks.")
	if (highestZone === 85) debug("You have unlocked the Quest challenge. It has now been added to Challenge 3 AutoPortal settings & AT will automatically complete Quests if AutoMaps is enabled during this challenge.")
	if (highestZone === 90) debug("You have unlocked the Archaeology challenge. It has now been added to AutoPortal setting & there are settings for it in the AT 'Challenges' tab.")
	if (highestZone === 100) debug("You have unlocked the Mayhem challenge. It has now been added to AutoPortal setting & there's setting for it in the AT 'C3' tab.")
	if (highestZone === 105) debug("You have unlocked the Storm challenge. It has now been added to Challenge 3 AutoPortal setting & there's setting for it in the AT 'C3' tab.")
	if (highestZone === 110) debug("You have unlocked the Insanity challenge. It has now been added to AutoPortal setting & there are settings for it in the AT 'Challenges' tab.")
	if (highestZone === 115) debug("You have unlocked the Berserk challenge. It has now been added to Challenge 3 AutoPortal setting.")
	if (highestZone === 135) debug("You have unlocked the Nurture challenge. It has now been added to AutoPortal setting & there is a setting for Laboratory's that has been added to AT's AutoStructure setting.")
	if (highestZone === 150) debug("You have unlocked the Pandemonium challenge. It has now been added to AutoPortal setting & there's setting for it in the AT 'C3' tab.")
	if (highestZone === 155) debug("You have unlocked the Alchemy challenge. It has now been added to AutoPortal setting & there are settings for it in the AT 'Challenges' tab.")
	if (highestZone === 175) debug("You have unlocked the Hypothermia challenge. It has now been added to AutoPortal setting & there are settings for it in the AT 'Challenges' tab.")
	if (highestZone === 175) debug("You have unlocked the Glass challenge. It has now been added to Challenge 3 AutoPortal setting.")
}

var fastimps =
	[
		"Snimp",
		"Kittimp",
		"Gorillimp",
		"Squimp",
		"Shrimp",
		"Chickimp",
		"Frimp",
		"Slagimp",
		"Lavimp",
		"Kangarimp",
		"Entimp",
		"Fusimp",
		"Carbimp",
		"Ubersmith",
		"Shadimp",
		"Voidsnimp",
		"Prismimp",
		"Sweltimp",
		"Indianimp",
		"Improbability",
		"Neutrimp",
		"Cthulimp",
		"Omnipotrimp",
		"Mutimp",
		"Hulking_Mutimp",
		"Liquimp",
		"Poseidimp",
		"Darknimp",
		"Horrimp",
		"Arachnimp",
		"Beetlimp",
		"Mantimp",
		"Butterflimp",
		"Frosnimp"
	];

function remainingHealth(forceMax) {
	var soldierHealth = game.global.soldierHealth
	if (game.global.universe == 2) {
		var maxLayers = Fluffy.isRewardActive('shieldlayer');
		var layers = maxLayers - game.global.shieldLayersUsed;
		var shieldHealth = 0;
		if (maxLayers > 0) {
			for (var i = 0; i <= maxLayers; i++) {
				if (layers != maxLayers && i > layers)
					continue;
				if (i == maxLayers - layers) {
					shieldHealth += game.global.soldierEnergyShieldMax;
				}
				else
					shieldHealth += game.global.soldierEnergyShield;
			}
		}
		else {
			shieldHealth = game.global.soldierEnergyShield;
		}
		shieldHealth = shieldHealth < 0 ? 0 : shieldHealth;
	}
	var remainingHealth = shieldHealth + (!forceMax ? soldierHealth * .33 : soldierHealth);
	if (game.global.challengeActive == 'Quest' && questcheck() == 8)
		remainingHealth = shieldHealth;
	if (shieldHealth + soldierHealth == 0) {
		remainingHealth = game.global.soldierHealthMax + (game.global.soldierEnergyShieldMax * (maxLayers + 1))
		if (game.global.challengeActive == 'Quest' && questcheck() == 8)
			remainingHealth = game.global.soldierEnergyShieldMax * (maxLayers + 1);
	}

	return (remainingHealth)
}

function rManageEquality() {
	if (!game.global.preMapsActive && game.global.gridArray.length > 0) {

		//Looking to see if the enemy that's currently being fought is fast.
		var fastEnemy = game.global.preMapsActive ? fastimps.includes(game.global.gridArray[game.global.lastClearedCell + 1].name) : fastimps.includes(getCurrentEnemy().name);
		//Checking if the map that's active is a Deadly voice map which always has first attack.
		var voidDoubleAttack = game.global.mapsActive && getCurrentMapObject().location == "Void" && getCurrentMapObject().voidBuff == 'doubleAttack';
		//Checking if the Frenzy buff is active.
		var noFrenzy = game.portal.Frenzy.frenzyStarted == "-1" && !autoBattle.oneTimers.Mass_Hysteria.owned && game.portal.Frenzy.radLevel > 0;
		//Checking if the experience buff is active during Exterminate.
		var experienced = game.global.challengeActive == 'Exterminate' && game.challenges.Exterminate.experienced;
		//Checking to see if the Glass challenge is being run where all enemies are fast.
		var runningGlass = game.global.challengeActive == 'Glass';

		//Toggles equality scaling on
		if ((fastEnemy && !experienced) || voidDoubleAttack || noFrenzy || runningGlass) {
			if (!game.portal.Equality.scalingActive) {
				game.portal.Equality.scalingActive = true;
				manageEqualityStacks();
				updateEqualityScaling();
			}
			//Toggles equality scaling off and sets equality stacks to 0
		} else {
			if (game.portal.Equality.scalingActive) {
				game.portal.Equality.scalingActive = false;
				game.portal.Equality.disabledStackCount = "0";
				manageEqualityStacks();
				updateEqualityScaling();
			}
		}
	}
}

function callAutoMapLevel(currentMap, currentAutoLevel, special, maxLevel, minLevel, floorCrit) {
	if (currentMap === undefined || currentAutoLevel === Infinity) {
		if (currentAutoLevel === Infinity) currentAutoLevel = autoMapLevel(special, maxLevel, minLevel, floorCrit);
		if (currentAutoLevel !== Infinity && twoSecondInterval) currentAutoLevel = autoMapLevel(special, maxLevel, minLevel, floorCrit);
	}

	//Increasing Map Level
	if (sixSecondInterval && currentMap !== undefined && (autoMapLevel(special, maxLevel, minLevel, floorCrit) > currentAutoLevel)) {
		currentAutoLevel = autoMapLevel(special, maxLevel, minLevel, floorCrit);
	}

	//Decreasing Map Level
	if (sixSecondInterval && currentMap !== undefined && (autoMapLevel(special, maxLevel, minLevel, floorCrit, true) < currentAutoLevel)) {
		currentAutoLevel = autoMapLevel(special, maxLevel, minLevel, floorCrit, true);
	}
	return currentAutoLevel
}

function autoMapLevel(special, maxLevel, minLevel, floorCrit, statCheck) {
	if (game.global.universe === 1) return 0;
	if (!game.global.mapsUnlocked) return 0;
	if (maxLevel > 10) maxLevel = 10;
	if (!statCheck) statCheck = false;
	if (game.global.world + maxLevel < 6) maxLevel = 0 - (game.global.world + 6);
	if (game.global.challengeActive === 'Wither' && maxLevel >= 0 && minLevel !== 0) maxLevel = -1;
	if (game.global.challengeActive === 'Insanity' && maxLevel >= 0 && minLevel !== 0) minLevel = 0;

	var maxLevel = typeof (maxLevel) === 'undefined' || maxLevel === null ? 10 : maxLevel;
	var minLevel = typeof (minLevel) === 'undefined' || minLevel === null ? 0 - game.global.world + 6 : minLevel;
	var special = !special ? (game.global.highestRadonLevelCleared > 83 ? 'lmc' : 'smc') : special;
	var biome = !biome ? (game.global.farmlandsUnlocked && game.global.universe == 2 ? "Farmlands" : game.global.decayDone ? "Plentiful" : "Mountain") : biome;
	var floorCrit = !floorCrit ? false : floorCrit;
	var difficulty = 0.75;
	var runningQuest = game.global.challengeActive == 'Quest' && questcheck() == 8;
	var ourHealth = RcalcOurHealth(runningQuest, 'map') * 2;

	for (y = maxLevel; y >= minLevel; y--) {
		var mapLevel = y;
		if (!statCheck && game.resources.fragments.owned < PerfectMapCost_Actual(mapLevel, special, biome))
			continue;

		var equalityAmt = equalityQuery('Snimp', game.global.world + mapLevel, 20, 'map', difficulty, 'oneShot');
		var ourDmg = RcalcOurDmg('min', equalityAmt, 'map', 'force', false, false, y);
		if (game.global.challengeActive === 'Daily' && typeof game.global.dailyChallenge.weakness !== 'undefined') ourDmg *= (1 - (9 * game.global.dailyChallenge.weakness.strength) / 100)
		var enemyHealth = RcalcEnemyHealthMod(game.global.world + mapLevel, 20, 'Turtlimp', 'map') * difficulty;
		var enemyDmg = RcalcBadGuyDmg(null, RgetEnemyAvgAttack(game.global.world + mapLevel, 20, 'Snimp', 'map', true), equalityAmt, 'map') * 1.5 * difficulty;
		enemyDmg *= typeof game.global.dailyChallenge.explosive !== 'undefined' ? 1 + dailyModifiers.explosive.getMult(game.global.dailyChallenge.explosive.strength) : 1

		//if (y === 2) queryAutoEqualityStats(ourDmg, ourHealth, enemyDmg, enemyHealth, equalityAmt)

		if (enemyHealth <= ourDmg && enemyDmg <= ourHealth) {
			return mapLevel;
		}
		if (y === minLevel) {
			return minLevel;
		}
	}
}

function equalityQuery(enemyName, zone, currentCell, mapType, difficulty, farmType) {

	if (!enemyName) enemyName = 'Snimp';
	if (!zone) zone = game.global.world;
	if (!mapType) mapType = 'world'
	if (!currentCell) mapType === 'world' ? 98 : 20;
	if (!difficulty) difficulty = 1;
	if (!farmType) farmType = 'gamma';

	var mapping = mapType === 'world' ? false : true;
	var bionicTalent = zone - game.global.world;
	var checkMutations = mapType === 'world' && game.global.world > 200 && getPageSetting('rMutationCalc');
	var titimp = mapType !== 'world' && farmType === 'oneShot' ? 'force' : false;

	//Challenge conditions
	var runningUnlucky = game.global.challengeActive == 'Unlucky';
	var runningDuel = game.global.challengeActive == 'Duel';
	var runningQuest = game.global.challengeActive == 'Quest' && questcheck() == 8; //Shield break quest

	//Initialising name/health/dmg variables
	//Enemy stats
	if (enemyName === 'Improbability' && zone <= 58) enemyName = 'Blimp';
	var enemyHealth = RcalcEnemyHealthMod(zone, currentCell, enemyName, mapType, checkMutations) * difficulty;
	var enemyDmg = RcalcBadGuyDmg(null, RgetEnemyAvgAttack(zone, currentCell, enemyName, mapType, false), 0, mapType) * difficulty * 1.5;
	enemyDmg *= mapType === 'map' && typeof game.global.dailyChallenge.explosive !== 'undefined' ? 1 + dailyModifiers.explosive.getMult(game.global.dailyChallenge.explosive.strength) : 1
	//if (mapType === 'void') debug("Enemy dmg = " + enemyDmg + " Enemy health = " + enemyHealth)

	enemyDmg *= runningDuel ? 10 : 1;
	//if (mapType === 'void') enemyDmg *= 2;
	//Our stats
	var ourHealth = RcalcOurHealth(runningQuest, mapType);
	var ourDmg = RcalcOurDmg('avg', 0, mapType, titimp, false, false, bionicTalent);
	//if (mapType === 'void') debug("Our dmg = " + ourDmg + " Our health = " + ourHealth)

	//Figuring out gamma to proc value
	var gammaToTrigger = gammaBurstPct === 1 ? 0 : autoBattle.oneTimers.Burstier.owned ? 4 : 5

	if (farmType === 'oneShot' && mapping) ourDmg *= 2;
	if (mapping && game.talents.mapHealth.purchased) ourHealth *= 2;
	if (checkMutations) {
		enemyDmg = RcalcBadGuyDmg(null, RgetEnemyAvgAttack(game.global.world, currentCell, enemyName, 'world', true), 0, 'world', checkMutations) * 1.5;
		enemyHealth = RcalcEnemyHealthMod(game.global.world, currentCell, enemyName, 'world', checkMutations);
	}

	if (game.global.challengeActive === 'Daily' && typeof game.global.dailyChallenge.weakness !== 'undefined') ourDmg *= (1 - ((mapType === 'map' ? 9 : gammaToTrigger) * game.global.dailyChallenge.weakness.strength) / 100)

	var ourDmgEquality = 0;
	var enemyDmgEquality = 0;
	if (enemyHealth !== 0) {
		for (var i = 0; i <= game.portal.Equality.radLevel; i++) {
			enemyDmgEquality = enemyDmg * Math.pow(game.portal.Equality.getModifier(), i)
			ourDmgEquality = ourDmg * Math.pow(game.portal.Equality.getModifier(1), i);
			if (runningUnlucky) {
				var unluckyDmg = Number(RcalcOurDmg('min', i, mapType, titimp, true, false, bionicTalent))
				//if (i === 1) debug(unluckyDmg)
				ourDmgEquality = RcalcOurDmg('min', i, mapType, titimp, false, false, bionicTalent);
				//if (i === 1) debug("Equal = " + ourDmgEquality)
				if (unluckyDmg.toString()[0] % 2 == 1) {
					continue;
				}
			}
			if (farmType === 'gamma' && ourHealth >= enemyDmgEquality) {
				return i;
			}
			else if (farmType === 'oneShot' && ourDmgEquality > enemyHealth && ourHealth > enemyDmgEquality) {
				return i;
			}
			else if (i === game.portal.Equality.radLevel) {
				return i;
			}
		}
	}
}

//Auto Equality
function equalityManagement() {
	if (!game.global.preMapsActive && game.global.gridArray.length > 0) {
		//Turning off equality scaling
		game.portal.Equality.scalingActive = false;
		//Misc vars
		var debugStats = getPageSetting('debugEqualityStats');
		var dailyEmpower = getPageSetting('rAutoEqualityEmpower');
		voidPBSwap = false;
		var mapping = game.global.mapsActive ? true : false;
		var currentCell = mapping ? game.global.lastClearedMapCell + 1 : game.global.lastClearedCell + 1;
		var mapGrid = mapping ? 'mapGridArray' : 'gridArray';
		var type = (!mapping) ? "world" : (getCurrentMapObject().location == "Void" ? "void" : "map");
		var zone = (type == "world" || !mapping) ? game.global.world : getCurrentMapObject().level;
		var bionicTalent = mapping && game.talents.bionic2.purchased && zone > game.global.world ? 1.5 : 1;
		var difficulty = mapping ? getCurrentMapObject().difficulty : 1;
		if (type === 'void') {
			voidPBSwap = getPageSetting('RhsVoidSwap') && game.global.lastClearedMapCell !== getCurrentMapObject().size - 2 && fastimps.includes(game.global.mapGridArray[game.global.lastClearedMapCell + 2].name) && game.global.voidBuff !== 'doubleAttack';
			if (getPageSetting('RhsVoidSwap')) HeirloomSwapping();
		}

		//Daily modifiers active
		var dailyEmpower = game.global.challengeActive === 'Daily' && typeof game.global.dailyChallenge.empower !== 'undefined' //Empower
		var dailyReflect = game.global.challengeActive === 'Daily' && typeof game.global.dailyChallenge.mirrored !== 'undefined'; //Reflect
		var dailyCrit = game.global.challengeActive === 'Daily' && typeof game.global.dailyChallenge.crits !== 'undefined'; //Crit
		var dailyExplosive = game.global.challengeActive === 'Daily' && typeof game.global.dailyChallenge.explosive !== 'undefined'; //Dmg on death
		var dailyWeakness = game.global.challengeActive === 'Daily' && typeof game.global.dailyChallenge.weakness !== 'undefined'; //% dmg reduction on hit
		var dailyBloodthirst = game.global.challengeActive === 'Daily' && typeof game.global.dailyChallenge.bloodthirst !== 'undefined'; //Bloodthirst (enemy heal + atk)

		//Challenge conditions
		var runningUnlucky = game.global.challengeActive == 'Unlucky';
		var runningDuel = game.global.challengeActive == 'Duel';
		var runningTrappa = game.global.challengeActive === 'Trappapalooza';
		var runningQuest = ((game.global.challengeActive == 'Quest' && questcheck() == 8)); //Shield break quest
		var runningArchaeology = game.global.challengeActive === 'Archaeology';
		var runningMayhem = game.global.challengeActive === 'Mayhem';
		var runningBerserk = game.global.challengeActive == 'Berserk';
		var runningExperienced = game.global.challengeActive == 'Exterminate' && game.challenges.Exterminate.experienced;
		var runningGlass = game.global.challengeActive == 'Glass';
		var runningSmithless = game.global.challengeActive == "Smithless" && !mapping && game.global.world % 25 === 0 && game.global.lastClearedCell == -1 && game.global.gridArray[0].ubersmith; //If UberSmith is active and not in a map

		//Perk conditions
		var noFrenzy = game.portal.Frenzy.radLevel > 0 && !autoBattle.oneTimers.Mass_Hysteria.owned;

		//Gamma burst info
		var gammaMaxStacks = gammaBurstPct === 1 ? 0 : autoBattle.oneTimers.Burstier.owned ? 4 : 5
		var gammaToTrigger = gammaMaxStacks - game.heirlooms.Shield.gammaBurst.stacks;
		var gammaDmg = gammaBurstPct;
		var fuckGamma = (dailyReflect || (runningSmithless && (10 - game.challenges.Smithless.uberAttacks) > gammaToTrigger));

		//Initialising Stat variables
		//Our stats
		var ourHealth = remainingHealth();
		var ourHealthMax = RcalcOurHealth(runningQuest, type)
		if (game.global.mapsActive && game.talents.mapHealth.purchased) ourHealthMax *= 2;
		var ourDmg = RcalcOurDmg('min', 0, type, true) * bionicTalent;
		if (noFrenzy) {
			if (getPageSetting('Rcalcfrenzy') && game.portal.Frenzy.frenzyStarted === -1) ourDmg /= 1 + (0.5 * game.portal.Frenzy.radLevel)
			if (!getPageSetting('Rcalcfrenzy') && game.portal.Frenzy.frenzyStarted !== -1) ourDmg *= 1 + (0.5 * game.portal.Frenzy.radLevel)
		}
		var ourDmgEquality = 0;

		//Enemy stats
		var enemyName = game.global[mapGrid][currentCell].name;
		var enemyHealth = game.global[mapGrid][currentCell].health;
		var enemyDmg = getCurrentEnemy().attack * RcalcBadGuyDmgMod() * 1.5;
		if (runningMayhem) enemyDmg /= game.challenges.Mayhem.getEnemyMult();
		enemyDmg *= game.global.voidBuff == 'doubleAttack' ? 2 : (game.global.voidBuff == 'getCrit' && (gammaToTrigger > 1 || runningBerserk || runningTrappa || runningArchaeology || runningQuest)) ? 5 : 1;
		enemyDmg *= dailyEmpower && !mapping && dailyEmpower && dailyCrit ? 1 + dailyModifiers.crits.getMult(game.global.dailyChallenge.crits.strength) : 1;
		enemyDmg *= dailyEmpower && !mapping && dailyEmpower && dailyExplosive ? 1 + dailyModifiers.explosive.getMult(game.global.dailyChallenge.explosive.strength) : 1;
		enemyDmg *= type === 'map' && mapping && dailyExplosive ? 1 + dailyModifiers.explosive.getMult(game.global.dailyChallenge.explosive.strength) : 1
		enemyDmg *= (type === 'world' || type === 'void') && dailyCrit && gammaToTrigger > 1 ? 1 + dailyModifiers.crits.getMult(game.global.dailyChallenge.crits.strength) : 1
		enemyDmg *= runningMayhem && ((!mapping && currentCell === 99) || mapping) ? 1.2 : 1
		//enemyDmg *= runningDuel && game.challenges.Duel.enemyStacks > 25 ? 10 : 1;
		var enemyDmgEquality = 0;

		//Misc dmg mult
		if (dailyWeakness) ourDmg *= (1 - ((game.global.dailyChallenge.weakness.stacks + (fastEnemy ? 1 : 0)) * game.global.dailyChallenge.weakness.strength) / 100)

		//Fast Enemy conditions
		var fastEnemy = !game.global.preMapsActive && fastimps.includes(enemyName);
		if (type === 'world' && game.global.world > 200 && game.global.gridArray[currentCell].u2Mutation.length > 0) fastEnemy = true;
		if (!mapping && (dailyEmpower || runningSmithless)) fastEnemy = true;
		if (type === 'map' && dailyExplosive) fastEnemy = true;
		if (type === 'world' && dailyExplosive) fastEnemy = true;
		if (game.global.voidBuff === 'doubleAttack') fastEnemy = true
		if (runningArchaeology) fastEnemy = true;
		if (noFrenzy) fastEnemy = true;
		if (runningTrappa) fastEnemy = true;
		if (runningExperienced) fastEnemy = false;
		if (runningGlass) fastEnemy = true;
		if (runningBerserk) fastEnemy = true;
		if (runningDuel && game.challenges.Duel.enemyStacks < 10) fastEnemy = true;

		//Making sure we get the Duel health bonus by suiciding trimps with 0 equality
		if (runningDuel && fastEnemy && (RcalcOurHealth(false, type) * 10 * (mapping ? 2 : 1) * 0.9) > remainingHealth(true) && gammaToTrigger === gammaMaxStacks && game.global.armyAttackCount === 0) {
			game.portal.Equality.disabledStackCount = 0;
			if (parseNum(document.getElementById('equalityStacks').children[0].innerHTML.replace(/\D/g, '')) !== game.portal.Equality.disabledStackCount) manageEqualityStacks();
			updateEqualityScaling();
			return;
		}

		//Suiciding to get max bloodthirst stacks if our avg attacks to kill is greater than the attacks to proc a bloodthirst stack. 
		if (dailyBloodthirst && mapping && fastEnemy) {
			var maxStacks = dailyModifiers.bloodthirst.getMaxStacks(game.global.dailyChallenge.bloodthirst.strength);
			var currStacks = game.global.dailyChallenge.bloodthirst.stacks;
			var stacksToProc = dailyModifiers.bloodthirst.getFreq(game.global.dailyChallenge.bloodthirst.strength) - (game.global.dailyChallenge.bloodthirst.stacks % dailyModifiers.bloodthirst.getFreq(game.global.dailyChallenge.bloodthirst.strength));
			var avgTrimpAttack = (ourDmg * Math.pow(game.portal.Equality.getModifier(1),
				equalityQuery(enemyName, zone, currentCell, type, difficulty, 'gamma')) * gammaDmg)
			var timeToKill = enemyHealth / avgTrimpAttack;

			if (currStacks !== maxStacks && stacksToProc < timeToKill) {
				game.portal.Equality.disabledStackCount = 0;
				if (parseNum(document.getElementById('equalityStacks').children[0].innerHTML.replace(/\D/g, '')) !== game.portal.Equality.disabledStackCount) manageEqualityStacks();
				updateEqualityScaling();
				return;
			}
		}

		if (enemyHealth !== 0 && enemyHealth !== -1) {
			for (var i = 0; i <= game.portal.Equality.radLevel; i++) {
				enemyDmgEquality = enemyDmg * Math.pow(game.portal.Equality.getModifier(), i);
				ourDmgEquality = ourDmg * Math.pow(game.portal.Equality.getModifier(1), i);

				if (runningMayhem) enemyDmgEquality += game.challenges.Mayhem.poison;

				if (runningUnlucky) {
					var unluckyDamage = RcalcOurDmg('min', i, type, true, true, true) * bionicTalent
					if (noFrenzy) {
						if (getPageSetting('Rcalcfrenzy') && game.portal.Frenzy.frenzyStarted === -1) unluckyDamage /= 1 + (0.5 * game.portal.Frenzy.radLevel)
						if (!getPageSetting('Rcalcfrenzy') && game.portal.Frenzy.frenzyStarted !== -1) unluckyDamage *= 1 + (0.5 * game.portal.Frenzy.radLevel)
					}
					if (Number(unluckyDamage).toString()[0] % 2 == 1)
						continue;
				}

				if (voidPBSwap && !fastEnemy && RcalcOurDmg('max', i, 'void', true, false, true) * 8 > enemyHealth && (typeof (game.global.mapGridArray[game.global.lastClearedMapCell + 2].plaguebringer) === 'undefined' || game.global.mapGridArray[game.global.lastClearedMapCell + 2].plaguebringer < getCurrentEnemy().maxHealth) && (getCurrentEnemy().maxHealth * .05 < enemyHealth)) {
					game.portal.Equality.disabledStackCount = game.portal.Equality.radLevel;
					while (RcalcOurDmg('max', i, 'void', true, false, true) * 8 > getCurrentEnemy().health && i < game.portal.Equality.radLevel) {
						i++;
					}
					continue;
				}
				if (!fastEnemy && !runningGlass && !runningBerserk && !runningArchaeology && !runningQuest) {
					game.portal.Equality.disabledStackCount = i;
					break;
				}
				else if ((ourHealth < (ourHealthMax * 0.65) || runningDuel && game.global.armyAttackCount !== 0) && gammaToTrigger == gammaMaxStacks && !runningTrappa && !runningArchaeology && !runningBerserk) {
					if (game.global.mapsUnlocked && (runningQuest || (!mapping && !runningMayhem))) {
						mapsClicked();
						mapsClicked();
					}
					else if (game.global.mapsUnlocked && mapping && currentCell > 0 && type !== 'void' && game.global.titimpLeft === 0) {
						mapsClicked();
						rRunMap();
					}
					else
						game.portal.Equality.disabledStackCount = 0;
					break;
				} else if (fastEnemy && enemyDmgEquality > ourHealth) {
					game.portal.Equality.disabledStackCount = game.portal.Equality.radLevel;
				} else if (runningMayhem && fastEnemy && enemyDmgEquality > ((game.global.soldierHealth * 6) + game.challenges.Mayhem.poison)) {
					continue;
				} else if ((ourDmgEquality * gammaDmg) < enemyHealth && (gammaToTrigger > 1 || (gammaToTrigger > 1 && fuckGamma))) {
					game.portal.Equality.disabledStackCount = game.portal.Equality.radLevel;
					break;
				} else if (ourHealth > enemyDmgEquality && gammaToTrigger <= 1) {
					game.portal.Equality.disabledStackCount = i;
					if (debugStats) queryAutoEqualityStats(ourDmgEquality, ourHealth, enemyDmgEquality, enemyHealth, i)
					break;
				} else if (ourHealth > enemyDmgEquality && ourDmgEquality > enemyHealth) {
					game.portal.Equality.disabledStackCount = i;
					break;
				} else if (ourHealth > (enemyDmgEquality * gammaToTrigger) && ourDmgEquality * gammaDmg > enemyHealth && !fuckGamma) {
					game.portal.Equality.disabledStackCount = i;
					break;
				} else if (ourHealth > (enemyDmgEquality * gammaToTrigger) && ourDmgEquality * gammaToTrigger > enemyHealth && !fuckGamma) {
					game.portal.Equality.disabledStackCount = i;
					break;
				} else if (ourHealth > (enemyDmgEquality * gammaToTrigger) && !fuckGamma) {
					game.portal.Equality.disabledStackCount = i;
					break;
				} else {
					game.portal.Equality.disabledStackCount = game.portal.Equality.radLevel;
				}
			}
			if (parseNum(document.getElementById('equalityStacks').children[0].innerHTML.replace(/\D/g, '')) !== game.portal.Equality.disabledStackCount) manageEqualityStacks();
			updateEqualityScaling();
		}
	}
}

function queryAutoEqualityStats(ourDamage, ourHealth, enemyDmgEquality, enemyHealth, equalityStacks, dmgMult) {
	debug("Equality = " + equalityStacks)
	debug("Our dmg (min) = " + ourDamage.toFixed(4) + " | " + "Our health = " + ourHealth.toFixed(4))
	debug("Enemy dmg = " + enemyDmgEquality.toFixed(4) + " | " + "Enemy health = " + enemyHealth.toFixed(4))
	if (dmgMult) debug("Mult = " + dmgMult)
}

function reflectShouldBuyEquips() {
	if (game.global.challengeActive === 'Daily') {
		if (typeof (game.global.dailyChallenge.mirrored) !== 'undefined') {
			var ourHealth = RcalcOurHealth(false, 'world');
			var ourDamage = RcalcOurDmg('max', (game.portal.Equality.radLevel - 15), 'world', false, false, true)
			var gammaToTrigger = autoBattle.oneTimers.Burstier.owned ? 4 : 5;
			var reflectPct = dailyModifiers.mirrored.getMult(game.global.dailyChallenge.mirrored.strength);
			var critChance = (getPlayerCritChance() - Math.floor(getPlayerCritChance())) * 100
			if (!(game.portal.Tenacity.getMult() === Math.pow(1.4000000000000001, getPerkLevel("Tenacity") + getPerkLevel("Masterfulness")))) {
				ourDamage /= game.portal.Tenacity.getMult();
				ourDamage *= Math.pow(1.4000000000000001, getPerkLevel("Tenacity") + getPerkLevel("Masterfulness"));
			}
			if (typeof game.global.dailyChallenge.empower !== 'undefined' || critChance > 10) {
				ourDamage /= RgetCritMulti(true);
				ourDamage *= RgetCritMulti(false, false, true);
			}
			if (ourDamage * (1 + (reflectPct * gammaToTrigger)) > ourHealth) {
				return true
			}

		}
	}
	return false;
}

function simpleSecondsLocal(what, seconds, event, ssWorkerRatio) {
	var event = !event ? null : event;
	var ssWorkerRatio = !ssWorkerRatio ? null : ssWorkerRatio;

	if (typeof ssWorkerRatio !== 'undefined' && ssWorkerRatio !== null) {
		var desiredRatios = Array.from(ssWorkerRatio.split(','))
		desiredRatios = [desiredRatios[0] !== undefined ? parseInt(desiredRatios[0]) : 0,
		desiredRatios[1] !== undefined ? parseInt(desiredRatios[1]) : 0,
		desiredRatios[2] !== undefined ? parseInt(desiredRatios[2]) : 0,
		desiredRatios[3] !== undefined ? parseInt(desiredRatios[3]) : 0]
		var totalFraction = desiredRatios.reduce((a, b) => { return a + b; });
	}
	//Come home to the impossible flavour of balanced resource gain. Come home, to simple seconds.
	var jobName;
	var pos;
	switch (what) {
		case "food":
			jobName = "Farmer";
			pos = 0
			break;
		case "wood":
			jobName = "Lumberjack";
			pos = 1
			break;
		case "metal":
			jobName = "Miner";
			pos = 2
			break;
		case "gems":
			jobName = "Dragimp";
			break;
		case "fragments":
			jobName = "Explorer";
			break;
		case "science":
			jobName = "Scientist";
			pos = 3
			break;
	}
	var heirloom = !jobName ? null :
		jobName == "Miner" && game.global.challengeActive == "Pandemonium" && getPageSetting("RhsPandStaff") !== 'undefined' ? "RhsPandStaff" :
			jobName == "Farmer" && getPageSetting("RhsFoodStaff") != 'undefined' ? "RhsFoodStaff" :
				jobName == "Lumberjack" && getPageSetting("RhsWoodStaff") != 'undefined' ? "RhsWoodStaff" :
					jobName == "Miner" && getPageSetting("RhsMetalStaff") != 'undefined' ? "RhsMetalStaff" :
						getPageSetting("RhsMapStaff") != 'undefined' ? "RhsMapStaff" :
							getPageSetting("RhsWorldStaff") != 'undefined' ? "RhsWorldStaff" :
								null;
	var job = game.jobs[jobName];
	var trimpworkers = ((game.resources.trimps.realMax() / 2) - game.jobs.Explorer.owned - game.jobs.Meteorologist.owned - game.jobs.Worshipper.owned);
	var workers = ssWorkerRatio !== null ? Math.floor(trimpworkers * desiredRatios[pos] / totalFraction) :
		rCurrentMap === 'rWorshipperFarm' ? trimpworkers :
			job.owned;

	var amt_local = workers * job.modifier * seconds;
	amt_local += (amt_local * getPerkLevel("Motivation") * game.portal.Motivation.modifier);
	if (what != "gems" && game.permaBoneBonuses.multitasking.owned > 0)
		amt_local *= (1 + game.permaBoneBonuses.multitasking.mult());
	if (what != "science" && what != "fragments" && game.global.challengeActive == "Alchemy")
		amt_local *= alchObj.getPotionEffect("Potion of Finding");

	if (game.global.pandCompletions && game.global.universe == 2 && what != "fragments")
		amt_local *= game.challenges.Pandemonium.getTrimpMult();
	if (getPerkLevel("Observation") > 0 && game.portal.Observation.trinkets > 0)
		amt_local *= game.portal.Observation.getMult();

	if (what == "food" || what == "wood" || what == "metal") {
		if (ssWorkerRatio) amt_local *= calculateParityBonus(desiredRatios);
		else amt_local *= getParityBonus();
		if (autoBattle.oneTimers.Gathermate.owned)
			amt_local *= autoBattle.oneTimers.Gathermate.getMult();
	}
	if ((what == "food" && game.buildings.Antenna.owned >= 5) || (what == "metal" && game.buildings.Antenna.owned >= 15))
		amt_local *= game.jobs.Meteorologist.getExtraMult();
	if (Fluffy.isRewardActive('gatherer'))
		amt_local *= 2;
	if (what == "wood" && game.global.challengeActive == "Hypothermia")
		amt_local *= game.challenges.Hypothermia.getWoodMult();
	if (game.global.challengeActive == "Unbalance")
		amt_local *= game.challenges.Unbalance.getGatherMult();

	if (game.global.challengeActive == "Daily") {
		if (typeof game.global.dailyChallenge.famine !== 'undefined' && what != "fragments" && what != "science")
			amt_local *= dailyModifiers.famine.getMult(game.global.dailyChallenge.famine.strength);
		if (typeof game.global.dailyChallenge.dedication !== 'undefined')
			amt_local *= dailyModifiers.dedication.getMult(game.global.dailyChallenge.dedication.strength);
	}
	if (game.global.challengeActive == "Melt") {
		amt_local *= 10;
		amt_local *= Math.pow(game.challenges.Melt.decayValue, game.challenges.Melt.stacks);
	}

	if (game.challenges.Nurture.boostsActive())
		amt_local *= game.challenges.Nurture.getResourceBoost();

	if (!getPageSetting('Rhs') || event == null || heirloom == null || game.global.StaffEquipped.name == autoTrimpSettings[heirloom].value) {
		amt_local = calcHeirloomBonus("Staff", jobName + "Speed", amt_local);
	}
	//Calculating proper value for the staff we should be using instead of equipped
	else if (event != null && game.global.StaffEquipped != getPageSetting(heirloom)) {
		if (what == "food" || what == "wood" || what == "metal") {
			if (ssWorkerRatio) amt_local /= calculateParityBonus(desiredRatios);
			else amt_local /= getParityBonus();
			amt_local *= getHazardParityMult(HeirloomSearch(heirloom)) > 0 ? getHazardParityMult(HeirloomSearch(heirloom)) : 1
		}
		amt_local = calcHeirloomBonusLocal(HeirloomModSearch(heirloom, jobName + "Speed"), amt_local);
	}
	var turkimpBonus = game.talents.turkimp2.purchased ? 2 : game.talents.turkimp2.purchased ? 1.75 : 1.5;

	if ((game.talents.turkimp2.purchased || game.global.turkimpTimer > 0) && (what == "food" || what == "metal" || what == "wood")) {
		amt_local *= turkimpBonus;
		amt_local += getPlayerModifier() * seconds;
	}
	return amt_local;
}

function calculateParityBonus(workerRatio) {
	if (!game.global.StaffEquipped || game.global.StaffEquipped.rarity < 10) {
		game.global.parityBonus = 1;
		return;
	}
	var allowed = ["Farmer", "Lumberjack", "Miner"];
	var totalWorkers = 0;
	var numWorkers = [];
	if (!workerRatio) {
		for (var x = 0; x < allowed.length; x++) {
			var thisWorkers = game.jobs[allowed[x]].owned;
			totalWorkers += thisWorkers;
			numWorkers[x] = thisWorkers;
		}
		var workerRatios = [];
		for (var x = 0; x < numWorkers.length; x++) {
			workerRatios.push(numWorkers[x] / totalWorkers);
		}
	} else {

		var freeWorkers = Math.ceil(Math.min(game.resources.trimps.realMax() / 2), game.resources.trimps.owned) - (game.resources.trimps.employed - game.jobs.Explorer.owned - game.jobs.Meteorologist.owned - game.jobs.Worshipper.owned);
		var workerRatios = workerRatio;
		var ratio = workerRatios.reduce((a, b) => a + b, 0)
		var freeWorkerDivided = freeWorkers / ratio;

		for (var x = 0; x < allowed.length; x++) {
			var thisWorkers = freeWorkerDivided * workerRatios[x];
			totalWorkers += thisWorkers;
			numWorkers[x] = thisWorkers;
		}
	}
	var resourcePop = totalWorkers;
	resourcePop = Math.log(resourcePop) / Math.log(3);
	var largestWorker = Math.log(Math.max(...numWorkers)) / Math.log(3);
	var spreadFactor = resourcePop - largestWorker;
	var preLoomBonus = (spreadFactor * spreadFactor);
	var finalWithParity = (1 + preLoomBonus) * getHazardParityMult();
	game.global.parityBonus = finalWithParity;
	return finalWithParity;
}


function calcHeirloomBonusLocal(mod, number) {
	var mod = mod;
	if (!mod) return;

	return (number * ((mod / 100) + 1));
}

function scaleToCurrentMapLocal(amt_local, ignoreBonuses, ignoreScry, map) {
	var map = !map && game.global.challengeActive == "Pandemonium" ? game.global.world - 1 :
		!map ? game.global.world :
			game.global.world + map;
	var compare = game.global.world;
	if (map > compare && map.location != "Bionic") {
		amt_local *= Math.pow(1.1, (map - compare));
	} else {
		if (game.talents.mapLoot.purchased)
			compare--;
		if (map < compare) {
			//-20% loot compounding for each level below world
			amt_local *= Math.pow(0.8, (compare - map));
		}
	}
	var maploot = game.global.mapsActive ? getCurrentMapObject().loot : game.global.farmlandsUnlocked && game.singleRunBonuses.goldMaps.owned ? 3.6 : game.global.decayDone && game.singleRunBonuses.goldMaps.owned ? 2.85 : game.global.farmlandsUnlocked ? 2.6 : game.global.decayDone ? 1.85 : 1.6;
	//Add map loot bonus
	amt_local = Math.round(amt_local * maploot);
	if (ignoreBonuses) return amt_local;
	amt_local = scaleLootBonuses(amt_local, ignoreScry);
	return amt_local;
}

function formatTimeForDescriptions(number) {
	var text;
	var seconds = Math.floor((number) % 60);
	var minutes = Math.floor((number / 60) % 60);
	var hours = Math.floor((number / 60 / 60));
	if (minutes <= 0 && hours <= 0) text = seconds + " second" + ((seconds == 1) ? "" : "s");
	else if (hours == 0) text = minutes + " minute" + ((minutes == 1) ? " " : "s ") + seconds + " second" + ((seconds == 1) ? "" : "s");
	else {
		text = hours + " hour" + ((hours == 1) ? " " : "s ") + minutes + " minute" + ((minutes == 1) ? " " : "s ") + seconds + " second" + ((seconds == 1) ? "" : "s");
	}
	return text;
}

function timeForFormatting(number) {
	return Math.floor((getGameTime() - number) / 1000);
}

function calculateMaxAffordLocal(itemObj, isBuilding, isEquipment, isJob, forceMax, forceRatio, resources) {
	if (!itemObj.cost) return 1;
	var forcedMax = 0;
	var mostAfford = -1;
	if (Number.isInteger(forceMax)) forcedMax = forceMax;
	//if (!forceMax) var forceMax = false;
	var forceMax = Number.isInteger(forceMax) ? forceMax : false;
	var currentOwned = (itemObj.purchased) ? itemObj.purchased : ((itemObj.level) ? itemObj.level : itemObj.owned);
	if (!currentOwned) currentOwned = 0;
	if (isJob && game.global.firing && !forceRatio) return Math.floor(currentOwned * game.global.maxSplit);
	//if (itemObj == game.equipment.Shield) console.log(currentOwned);
	for (var item in itemObj.cost) {
		var price = itemObj.cost[item];
		var toBuy;
		var resource = game.resources[item];
		var resourcesAvailable = !resources ? resource.owned : resources;
		if (resourcesAvailable < 0) resourcesAvailable = 0;
		if (game.global.maxSplit != 1 && !forceMax && !forceRatio) resourcesAvailable = Math.floor(resourcesAvailable * game.global.maxSplit);
		else if (forceRatio) resourcesAvailable = Math.floor(resourcesAvailable * forceRatio);

		if (item === 'fragments') resourcesAvailable = autoTrimpSettings.rBuildingSettingsArray.value.SafeGateway.zone !== 0 && game.global.world >= autoTrimpSettings.rBuildingSettingsArray.value.SafeGateway.zone ? resourcesAvailable :
			autoTrimpSettings.rBuildingSettingsArray.value.SafeGateway.enabled && resourcesAvailable > resource.owned - (PerfectMapCost_Actual(10, 'lmc') * autoTrimpSettings.rBuildingSettingsArray.value.SafeGateway.mapCount) ? resource.owned - (PerfectMapCost_Actual(10, 'lmc') * autoTrimpSettings.rBuildingSettingsArray.value.SafeGateway.mapCount) :
				resourcesAvailable;
		if (!resource || typeof resourcesAvailable === 'undefined') {
			console.log("resource " + item + " not found");
			return 1;
		}
		if (typeof price[1] !== 'undefined') {
			var start = price[0];
			if (isEquipment) {
				var artMult = getEquipPriceMult();
				start = Math.ceil(start * artMult);
			}
			if (isBuilding && getPerkLevel("Resourceful")) start = start * (Math.pow(1 - game.portal.Resourceful.modifier, getPerkLevel("Resourceful")));
			toBuy = Math.floor(log10(((resourcesAvailable / (start * Math.pow(price[1], currentOwned))) * (price[1] - 1)) + 1) / log10(price[1]));

		}
		else if (typeof price === 'function') {
			return 1;
		}
		else {
			if (isBuilding && getPerkLevel("Resourceful")) price = Math.ceil(price * (Math.pow(1 - game.portal.Resourceful.modifier, getPerkLevel("Resourceful"))));
			toBuy = Math.floor(resourcesAvailable / price);
		}
		if (mostAfford == -1 || mostAfford > toBuy) mostAfford = toBuy;
	}
	if (forceRatio && (mostAfford <= 0 || isNaN(mostAfford))) return 0;
	if (isBuilding && mostAfford > 1000000000) return 1000000000;
	if (mostAfford <= 0) return 1;
	if (forceMax !== false && mostAfford > forceMax) return forceMax;
	if (isJob && itemObj.max && itemObj.owned + mostAfford > itemObj.max) return (itemObj.max - itemObj.owned);
	return mostAfford;
}

function boneShrineOutput(charges) {

	charges = !charges ? 0 : charges;

	var eligible = ["food", "wood", "metal"];
	var storage = ["Barn", "Shed", "Forge"];
	var rewarded = [0, 0, 0];
	var hasNeg = false;
	for (var x = 0; x < eligible.length; x++) {
		var resName = eligible[x];
		var resObj = game.resources[resName];
		var amt = simpleSeconds(resName, (game.permaBoneBonuses.boosts.timeGranted() * 60));
		amt = scaleLootBonuses(amt, true);
		amt *= charges
		var tempMax = resObj.max;
		var packMod = getPerkLevel("Packrat") * game.portal.Packrat.modifier;
		var newTotal = resObj.owned + amt;
		while (newTotal > calcHeirloomBonus("Shield", "storageSize", tempMax + (tempMax * packMod))) {
			var nextCost = calculatePercentageBuildingCost(storage[x], resName, 0.25, tempMax);
			if (newTotal < nextCost) break;
			newTotal -= nextCost;
			amt -= nextCost;
			tempMax *= 2;
		}
		rewarded[x] = amt;
		if (amt < 0) hasNeg = true;
	}
	var text = prettify(rewarded[0]) + " Food, " + prettify(rewarded[1]) + " Wood, and " + prettify(rewarded[2]) + " Metal."

	return text;
}

function PerfectMapCost_Actual(plusLevel, specialModifier, biome) {
	if (!specialModifier) return Infinity
	if (!plusLevel && plusLevel !== 0) return Infinity
	var specialModifier = specialModifier;
	var plusLevel = plusLevel;
	var baseCost = 27;
	var mapLevel = game.global.world;
	if (plusLevel < 0)
		mapLevel = mapLevel - plusLevel;
	if (mapLevel < 6)
		mapLevel = 6;
	baseCost *= (game.global.world >= 60) ? 0.74 : 1;
	baseCost += 6
	if (plusLevel > 0)
		baseCost += (plusLevel * 10)
	if (specialModifier != "0")
		baseCost += 18
	baseCost += mapLevel;
	baseCost = Math.floor((((baseCost / 150) * (Math.pow(1.14, baseCost - 1))) * mapLevel * 2) * Math.pow((1.03 + (mapLevel / 50000)), mapLevel));
	baseCost *= biome !== 'Random' ? 2 : 1;
	return baseCost;
}

function runAtlantrimp(dontRecycle) {
	if (game.global.mapsActive && getCurrentMapObject().name === 'Atlantrimp') return;

	if (!game.global.preMapsActive && !game.global.mapsActive)
		mapsClicked();
	if (!dontRecycle && game.global.mapsActive && getCurrentMapObject().name !== 'Atlantrimp') {
		mapsClicked();
		recycleMap();
	}

	if (game.global.preMapsActive) {
		for (var map in game.global.mapsOwnedArray) {
			if (game.global.mapsOwnedArray[map].name == 'Atlantrimp') {
				selectMap(game.global.mapsOwnedArray[map].id)
				rRunMap();
				debug('Running Atlantrimp on zone ' + game.global.world + '.');
				rBSRunningAtlantrimp = true;
			}
		}
	}
}

function runUnique(mapName, dontRecycle) {
	if (game.global.mapsActive && getCurrentMapObject().name === mapName) return;
	if (mapName === 'Atlantrimp' && game.global.universe === 1) mapName === 'Trimple of Doom'
	var zone = game.global.world;
	var cell = game.global.lastClearedCell + 2;
	if (mapName === 'Melting Point' && (!game.mapUnlocks.SmithFree.canRunOnce || zone < 55 || (zone === 55 && cell < 56))) return
	if (mapName === 'Atlantrimp' && (!game.mapUnlocks.AncientTreasure.canRunOnce || zone < 33 || (zone === 33 && cell < 50))) return

	if (!game.global.preMapsActive && !game.global.mapsActive)
		mapsClicked();
	if (!dontRecycle && game.global.mapsActive && getCurrentMapObject().name !== mapName) {
		mapsClicked();
		recycleMap();
	}

	if (game.global.preMapsActive) {
		for (var map in game.global.mapsOwnedArray) {
			if (game.global.mapsOwnedArray[map].name == mapName) {
				selectMap(game.global.mapsOwnedArray[map].id)
				rRunMap();
				debug('Running ' + mapName + ' on zone ' + game.global.world + '.');
				if (mapName === 'Atlantrimp') rBSRunningAtlantrimp = true;
			}
		}
	}
}

function ABItemSwap(items, ring) {
	items = !items ? false : items;
	ring = !ring ? false : ring;
	var changeitems = false;
	if (items) {
		if (changeitems = true) {
			for (var item in autoBattle.items) {
				if (autoBattle.items[item].equipped) {
					autoBattle.items[item].equipped = false;
					changeitems = false;
				}
			}
		}
		for (var item of items) {
			if (autoBattle.items[item].equipped == false) {
				changeitems = true;
				if (autoBattle.items[item].hidden)
					autoBattle.items[item].hidden = false;
				autoBattle.items[item].equipped = true;
			}
		}
	}

	if (ring) {
		autoBattle.rings.mods = ring;
	}
}

function automateSpireAssault() {

	if (autoBattle.maxEnemyLevel < 100 && autoBattle.items.Stormbringer.owned && autoBattle.items.Nullifium_Armor.owned && autoBattle.items.Haunted_Harpoon.owned) {
		if (autoBattle.items.Stormbringer.owned && autoBattle.items.Stormbringer.level < 5)
			autoBattle.upgrade('Stormbringer')
		if (autoBattle.items.Nullifium_Armor.owned && autoBattle.items.Nullifium_Armor.level < 4)
			autoBattle.upgrade('Nullifium_Armor')
		if (autoBattle.items.Haunted_Harpoon.owned && autoBattle.items.Haunted_Harpoon.level < 3)
			autoBattle.upgrade('Haunted_Harpoon')
	}
	if (autoBattle.enemyLevel === 109 && autoBattle.items.Haunted_Harpoon.level === 5 && autoBattle.rings.level === 36 && autoBattle.shards >= autoBattle.upgradeCost('Haunted_Harpoon'))
		autoBattle.upgrade('Haunted_Harpoon')

	if (autoBattle.enemyLevel === 117) {
		if (autoBattle.rings.level < 40 && autoBattle.shards >= autoBattle.getRingLevelCost()) {
			autoBattle.levelRing();
			if (autoBattle.rings.level === 40 && autoBattle.bonuses.Extra_Limbs.level === 11) {
				var items = [['Menacing_Mask'], ['Lifegiving_Gem'], ['Shock_and_Awl'], ['Spiked_Gloves'], ['Wired_Wristguards'], ['Sacrificial_Shank'], ['Grounded_Crown'], ['Fearsome_Piercer'], ['Bag_of_Nails'], ['Blessed_Protector'], ['Doppelganger_Signet'], ['Omni_Enhancer'], ['Stormbringer'], ['Nullifium_Armor'], ['Haunted_Harpoon']];
				var ring = ['attack', 'lifesteal']
				ABItemSwap(items, ring);
				autoBattle.popup(true, false, true);
				autoBattle.resetCombat();
			}
		}
	}
	if (autoBattle.enemyLevel === 121) {
		if (autoBattle.rings.level === 45 && autoBattle.items.Omni_Enhancer.level === 10 && autoBattle.shards >= autoBattle.upgradeCost('Omni_Enhancer')) {
			autoBattle.upgrade('Omni_Enhancer');
		}
		if (autoBattle.rings.level === 45 && autoBattle.shards >= autoBattle.getRingLevelCost()) {
			autoBattle.levelRing();
		}
	}
	if (autoBattle.rings.level < 40) {
		if (autoBattle.enemyLevel == 92) { //6s kills - 2.14h cleartime
			var items = ['Rusty_Dagger', 'Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Big_Cleaver', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 93) { //5.47s kills - 2h cleartime
			var items = ['Rusty_Dagger', 'Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Fearsome_Piercer', 'Bag_of_Nails', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['lifesteal', 'health']
		}
		if (autoBattle.enemyLevel == 94) { //6.3s killtime - 2.3h cleartime
			var items = ['Rusty_Dagger', 'Shock_and_Awl', 'Spiked_Gloves', 'Wired_Wristguards', 'Aegis', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'lifesteal']
		}
		if (autoBattle.enemyLevel == 95) { //6.4s killtime - 2.4h cleartime
			var items = ['Rusty_Dagger', 'Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Big_Cleaver', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 96) { //7.2s killtime - 2.7h cleartime
			var items = ['Rusty_Dagger', 'Shock_and_Awl', 'Spiked_Gloves', 'Wired_Wristguards', 'Aegis', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 97) { //6s killtime - 2.3h cleartime
			var items = ['Rusty_Dagger', 'Shock_and_Awl', 'Spiked_Gloves', 'Wired_Wristguards', 'Aegis', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 98) { //6.51s killtime - 2.5h cleartime
			var items = ['Rusty_Dagger', 'Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Big_Cleaver', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 99) { //7.5s killtime - 2.9h cleartime
			var items = ['Lifegiving_Gem', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Bag_of_Nails', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['lifesteal', 'dustMult']
		}

		if (autoBattle.enemyLevel == 100) { //7.5s killtime - 2.9h cleartime
			var items = ['Rusty_Dagger', 'Bad_Medkit', 'Shock_and_Awl', 'Wired_Wristguards', 'Aegis', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 101) { //5.7s killtime - 2.2h cleartime
			var items = ['Lifegiving_Gem', 'Shock_and_Awl', 'Spiked_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Bag_of_Nails', 'Blessed_Protector', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['health', 'lifesteal']
		}
		if (autoBattle.enemyLevel == 102) { //5.7s killtime - 2.2h cleartime
			var items = ['Lifegiving_Gem', 'Shock_and_Awl', 'Spiked_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Bag_of_Nails', 'Blessed_Protector', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['health', 'lifesteal']
		}
		if (autoBattle.enemyLevel == 103) { //7.74s killtime - 3.5h cleartime
			var items = ['Lifegiving_Gem', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Fearsome_Piercer', 'Bag_of_Nails', 'The_Doomspring', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 104) { //7.2s killtime - 2.8h cleartime
			var items = ['Rusty_Dagger', 'Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 105) { //8.28s killtime - 3.4h cleartime
			var items = ['Rusty_Dagger', 'Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 106) { //9.04s killtime - 3.8h cleartime
			var items = ['Rusty_Dagger', 'Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 107) { //8.51s killtime - 3.6h cleartime
			var items = ['Rusty_Dagger', 'Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 108) { //12.56s killtime - 5.3h cleartime
			var items = ['Lifegiving_Gem', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Bag_of_Nails', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'lifesteal']
		}
		if (autoBattle.enemyLevel == 109) { //9.9s killtime - 4.2h cleartime
			var items = ['Rusty_Dagger', 'Lifegiving_Gem', 'Shock_and_Awl', 'Spiked_Gloves', 'Fearsome_Piercer', 'Blessed_Protector', 'The_Doomspring', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'lifesteal']
		}
	}

	if (autoBattle.rings.level >= 35 && autoBattle.rings.level < 50) {
		if (autoBattle.enemyLevel == 110) {
			var items = ['Rusty_Dagger', 'Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Bag_of_Nails', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 111) {
			var items = ['Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Sacrificial_Shank', 'Grounded_Crown', 'Fearsome_Piercer', 'Bag_of_Nails', 'Blessed_Protector', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 112) {
			var items = ['Rusty_Dagger', 'Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Bag_of_Nails', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 113) {
			var items = ['Rusty_Dagger', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Grounded_Crown', 'Fearsome_Piercer', 'Bag_of_Nails', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 114) {
			var items = ['Menacing_Mask', 'Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Wired_Wristguards', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Bag_of_Nails', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 115) {
			var items = ['Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Wired_Wristguards', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Bag_of_Nails', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 116) {
			var items = ['Rusty_Dagger', 'Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Wired_Wristguards', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 117) {
			var items = ['Rusty_Dagger', 'Bad_Medkit', 'Lifegiving_Gem', 'Shock_and_Awl', 'Spiked_Gloves', 'Wired_Wristguards', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'lifesteal']
		}

		if (autoBattle.enemyLevel == 118) { //9s killtimes - 4h11m clear
			var items = ['Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Big_Cleaver', 'Sacrificial_Shank', 'Grounded_Crown', 'Fearsome_Piercer', 'Bag_of_Nails', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 119) { //11.1s killtimes - 5h12m clear
			var items = ['Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Big_Cleaver', 'Sacrificial_Shank', 'Grounded_Crown', 'Fearsome_Piercer', 'Bag_of_Nails', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 120) { //25.5s killtimes - 12h4m clear
			var items = ['Bad_Medkit', 'Shock_and_Awl', 'Spiked_Gloves', 'Bloodstained_Gloves', 'Big_Cleaver', 'Sacrificial_Shank', 'Grounded_Crown', 'Fearsome_Piercer', 'Bag_of_Nails', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 121) {
			var items = ['Bad_Medkit', 'Lifegiving_Gem', 'Shock_and_Awl', 'Spiked_Gloves', 'Big_Cleaver', 'Sacrificial_Shank', 'Grounded_Crown', 'Fearsome_Piercer', 'Bag_of_Nails', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'lifesteal']
		}
	}

	if (autoBattle.rings.level < 50) {
		if (autoBattle.enemyLevel == 122) {
			var items = ['Menacing_Mask', 'Battery_Stick', 'Lifegiving_Gem', 'Spiked_Gloves', 'Wired_Wristguards', 'Bloodstained_Gloves', 'Eelimp_in_a_Bottle', 'Big_Cleaver', 'Sacrificial_Shank', 'Grounded_Crown', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'lifesteal']
		}
		if (autoBattle.enemyLevel == 123) {
			var items = ['Menacing_Mask', 'Battery_Stick', 'Lifegiving_Gem', 'Spiked_Gloves', 'Wired_Wristguards', 'Bloodstained_Gloves', 'Eelimp_in_a_Bottle', 'Big_Cleaver', 'Sacrificial_Shank', 'Grounded_Crown', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'lifesteal']
		}
		if (autoBattle.enemyLevel == 124) {
			var items = ['Menacing_Mask', 'Battery_Stick', 'Lifegiving_Gem', 'Spiked_Gloves', 'Wired_Wristguards', 'Eelimp_in_a_Bottle', 'Big_Cleaver', 'Sacrificial_Shank', 'Grounded_Crown', 'Fearsome_Piercer', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'lifesteal']
		}
		if (autoBattle.enemyLevel == 125) {
			var items = ['Menacing_Mask', 'Battery_Stick', 'Spiked_Gloves', 'Tame_Snimp', 'Wired_Wristguards', 'Bloodstained_Gloves', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Bag_of_Nails', 'Snimp__Fanged_Blade', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 126) {
			var items = ['Menacing_Mask', 'Battery_Stick', 'Spiked_Gloves', 'Tame_Snimp', 'Wired_Wristguards', 'Big_Cleaver', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Bag_of_Nails', 'Snimp__Fanged_Blade', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 127) {
			var items = ['Menacing_Mask', 'Battery_Stick', 'Spiked_Gloves', 'Tame_Snimp', 'Wired_Wristguards', 'Big_Cleaver', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Bag_of_Nails', 'Snimp__Fanged_Blade', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 128) {
			var items = ['Menacing_Mask', 'Battery_Stick', 'Spiked_Gloves', 'Tame_Snimp', 'Wired_Wristguards', 'Big_Cleaver', 'Sacrificial_Shank', 'Fearsome_Piercer', 'Bag_of_Nails', 'Snimp__Fanged_Blade', 'Doppelganger_Signet', 'Basket_of_Souls', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 129) {
			autoBattle.enemyLevel = 121;
			var items = ['Menacing_Mask', 'Raincoat', 'Lifegiving_Gem', 'Shock_and_Awl', 'Spiked_Gloves', 'Wired_Wristguards', 'Big_Cleaver', 'Sacrificial_Shank', 'Grounded_Crown', 'Fearsome_Piercer', 'Bag_of_Nails', 'Doppelganger_Signet', 'Omni_Enhancer', 'Stormbringer', 'Nullifium_Armor', 'Haunted_Harpoon']
			var ring = ['attack', 'lifesteal']
			ABItemSwap(items, ring);
			autoBattle.popup(true, false, true);
			autoBattle.resetCombat();
		}
	}

	if (autoBattle.rings.level >= 50) {
		if (autoBattle.enemyLevel == 129) {
			var items = [['Menacing_Mask'], ['Shock_and_Awl'], ['Spiked_Gloves'], ['Tame_Snimp'], ['Wired_Wristguards'], ['Big_Cleaver'], ['Sacrificial_Shank'], ['Fearsome_Piercer'], ['Bag_of_Nails'], ['Snimp__Fanged_Blade'], ['Doppelganger_Signet'], ['Basket_of_Souls'], ['Omni_Enhancer'], ['Stormbringer'], ['Nullifium_Armor'], ['Haunted_Harpoon']]
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 130) {
			var items = [['Menacing_Mask'], ['Shock_and_Awl'], ['Spiked_Gloves'], ['Tame_Snimp'], ['Wired_Wristguards'], ['Big_Cleaver'], ['Sacrificial_Shank'], ['Fearsome_Piercer'], ['Bag_of_Nails'], ['Snimp__Fanged_Blade'], ['Doppelganger_Signet'], ['Basket_of_Souls'], ['Omni_Enhancer'], ['Stormbringer'], ['Nullifium_Armor'], ['Haunted_Harpoon']]
			var ring = ['attack', 'health']
		}
		if (autoBattle.enemyLevel == 131) {
			var items = [['Menacing_Mask'], ['Bad_Medkit'], ['Lifegiving_Gem'], ['Shock_and_Awl'], ['Spiked_Gloves'], ['Wired_Wristguards'], ['Big_Cleaver'], ['Sacrificial_Shank'], ['Fearsome_Piercer'], ['Bag_of_Nails'], ['Doppelganger_Signet'], ['Basket_of_Souls'], ['Omni_Enhancer'], ['Stormbringer'], ['Nullifium_Armor'], ['Haunted_Harpoon']]
			var ring = ['attack', 'lifesteal']
		}
	}

	//Swapping Items
	if (autoBattle.sessionEnemiesKilled == 0 && autoBattle.enemy.baseHealth == autoBattle.enemy.health && autoBattle.maxEnemyLevel === autoBattle.enemyLevel) {
		ABItemSwap(items, ring);
		autoBattle.popup(true, false, true);
	}

	//Turning off autoLevel
	if (autoBattle.maxEnemyLevel >= 99 && autoBattle.rings.level < 27 && autoBattle.items.Fearsome_Piercer.level < 11) {
		if (autoBattle.autoLevel) autoBattle.toggleAutoLevel();
		return;
	}

	if (autoBattle.maxEnemyLevel >= 102 && autoBattle.rings.level < 30) {
		if (autoBattle.autoLevel) autoBattle.toggleAutoLevel();
		return;
	}

	if (autoBattle.maxEnemyLevel >= 109 && (autoBattle.rings.level < 36 || autoBattle.items.Haunted_Harpoon.level < 6 || autoBattle.items.Nullifium_Armor.level < 6 || autoBattle.items.Stormbringer.level < 7 || autoBattle.items.Omni_Enhancer.level < 8 || autoBattle.items.Basket_of_Souls.level < 9)) {
		if (autoBattle.autoLevel) autoBattle.toggleAutoLevel();
		return;
	}

	if (autoBattle.maxEnemyLevel >= 117 && autoBattle.rings.level < 40) {
		if (autoBattle.autoLevel) autoBattle.toggleAutoLevel();
		return;
	}
	if (autoBattle.maxEnemyLevel >= 121 && (autoBattle.rings.level < 46 || autoBattle.items.Omni_Enhancer.level < 11)) {
		if (autoBattle.autoLevel) autoBattle.toggleAutoLevel();
		return;
	}
	if (autoBattle.maxEnemyLevel >= 129 && autoBattle.rings.level < 50) {
		if (autoBattle.autoLevel) autoBattle.toggleAutoLevel();
		return;
	}

	if (autoBattle.maxEnemyLevel >= 131) {
		if (autoBattle.autoLevel) autoBattle.toggleAutoLevel();
		return;
	}

	if (!autoBattle.autoLevel)
		autoBattle.toggleAutoLevel();

}

function totalSAResources() {
	//total Dust!
	var dust = 0;
	var shards = 0;
	//Contracts
	var dustContracts = 0;
	var shardContracts = 0;
	for (var item in autoBattle.items) {
		if (item === 'Sword' || item === 'Menacing_Mask' || item === 'Armor' || item === 'Rusty_Dagger' || item === 'Fists_of_Goo' || item === 'Battery_Stick' || item === 'Pants') continue;
		if (typeof (autoBattle.items[item].dustType) === 'undefined') dustContracts += autoBattle.contractPrice(item);
		else shardContracts += autoBattle.contractPrice(item);
	}
	dust += dustContracts;
	shards += shardContracts;

	//Items
	var dustItems = 0;
	var shardItems = 0;
	for (var item in autoBattle.items) {
		//if (typeof (autoBattle.items[item].dustType) !== 'undefined' && autoBattle.items[item].dustType === 'shards') continue;
		var itemPrice = autoBattle.items[item].startPrice;
		var itemPriceMod = autoBattle.items[item].priceMod;
		if (typeof (autoBattle.items[item].startPrice) === 'undefined') itemPrice = 5;
		if (typeof (autoBattle.items[item].priceMod) === 'undefined') itemPriceMod = 3;
		for (var x = 0; x < autoBattle.items[item].level; x++) {
			if (typeof (autoBattle.items[item].dustType) === 'undefined') dustItems += (itemPrice * ((Math.pow(itemPriceMod, x)) / (itemPriceMod)))
			else shardItems += (itemPrice * ((Math.pow(itemPriceMod, x)) / (itemPriceMod)))
		}
	}
	dust += dustItems;
	shards += shardItems;

	//Bonuses
	var dustBonuses = 0;
	var shardBonuses = 0;
	for (var bonus in autoBattle.bonuses) {
		var bonusPrice = autoBattle.bonuses[bonus].price
		var bonusPriceMod = autoBattle.bonuses[bonus].priceMod;
		for (var x = 0; x < autoBattle.bonuses[bonus].level; x++) {
			if (bonus !== 'Scaffolding') dustBonuses += Math.ceil(bonusPrice * Math.pow(bonusPriceMod, x));
			else shardBonuses += Math.ceil(bonusPrice * Math.pow(bonusPriceMod, x));
		}
	}

	dust += dustBonuses
	shards += shardBonuses

	//One Timers
	var dustOneTimers = 0;
	var shardOneTimers = 0;
	for (var item in autoBattle.oneTimers) {
		if (typeof (autoBattle.oneTimers[item].useShards) === 'undefined') dustOneTimers += autoBattle.oneTimerPrice(item);
		else shardOneTimers += autoBattle.oneTimerPrice(item)
	}
	dust += dustOneTimers;
	shards += shardOneTimers;

	//Ring
	var ringCost = 0;
	if (autoBattle.oneTimers["The_Ring"].owned && autoBattle.rings.level > 1) {
		ringCost += Math.ceil(15 * Math.pow(2, autoBattle.rings.level) - 30); // Subtracting 30 for the first level or something.
	}
	shards += ringCost;

	return [dust, shards];
}

function PresetSwapping(preset) {
	if (!getPageSetting('RPerkSwapping')) return

	var preset = !preset ? null :
		(preset != 1 && preset != 2 && preset != 3) ? null :
			preset;

	if (preset == null) {
		debug("Invalid input. Needs to be a value between 1 and 3.");
		return;
	}

	presetTab(preset);
	loadPerkPreset();
}

function hypoPackratReset(challenge) {

	if (challenge == 'Hypothermia' && autoTrimpSettings.rHypoDefaultSettings.value.packrat) {
		toggleRemovePerks();
		numTab(6, true);
		buyPortalUpgrade('Packrat');
		toggleRemovePerks();
		tooltip('Custom', null, 'update', true);
		document.getElementById('customNumberBox').value = 3;
		numTab(5, true)
		buyPortalUpgrade('Packrat');
	}
}

function AllocatePerks() {
	if (!game.global.portalActive) return;
	if (getPageSetting('RAutoAllocatePerks') === 0) return;
	var allocatePerk = getPageSetting('RAutoAllocatePerks') == 1 ? 'Looting' : getPageSetting('RAutoAllocatePerks') == 2 ? 'Greed' : getPageSetting('RAutoAllocatePerks') == 3 ? 'Motivation' : null;
	if (allocatePerk !== null) {
		numTab(6, true)
		buyPortalUpgrade(allocatePerk);
		debug('Bought Max ' + allocatePerk);
	}
}

function PerkRespec(preset) {
	//Swaps between presets depending on the input provided. Will only function if the input is between 1 and 3.
	var preset = !preset ? null :
		(preset != 1 && preset != 2 && preset != 3) ? null :
			preset;

	if (preset == null) {
		debug("Invalid input. Needs to be a value between 1 and 3.");
		return;
	}

	//Respecs to a different preset and fires all workers to ensure that decreases in carp levels won't impact its ability to respec
	if (game.global.canRespecPerks) {
		viewPortalUpgrades();
		respecPerks();
		presetTab(preset);
		loadPerkPreset();
		game.jobs.Miner.owned = 0;
		game.jobs.Farmer.owned = 0;
		game.jobs.Lumberjack.owned = 0;
		activateClicked();
		debug("Respecced to preset " + preset);
	} else
		debug("No respec available");
}

function AbandonChallengeRuns(zone) {
	//Abandons challenge runs when a certain zone has been reached.
	var zone = !zone ? (getPageSetting('c3finishrun') === -1 ? Infinity : getPageSetting('c3finishrun')) :
		zone;
	var hasPaused = false;

	if (zone === null) return
	if (game.global.world == zone && game.global.runningChallengeSquared) {
		if (game.options.menu.pauseGame.enabled && !hasPaused) {
			toggleSetting('pauseGame');
			hasPaused = true;
		}
		if (getPageSetting('RdownloadSaves')) {
			//Download save
			tooltip('Export', null, 'update');
			document.getElementById("downloadLink").click();
			cancelTooltip();
		}

		//Cancel out of c3
		confirmAbandonChallenge();
		abandonChallenge();
		cancelTooltip();
		if (hasPaused) {
			toggleSetting('pauseGame');
			hasPaused = false;
		}
	}
}

function dailyModifiersOutput() {
	var daily = game.global.dailyChallenge;
	if (!daily) return "";
	//var returnText = ''
	var returnText = "";
	for (var item in daily) {
		if (item == 'seed') continue;
		returnText += dailyModifiers[item].description(daily[item].strength) + "<br>";
	}
	return returnText
}

function dailyModiferReduction() {
	if (game.global.challengeActive !== 'Daily') return 0;
	var dailyMods = dailyModifiersOutput().split('<br>')
	dailyMods.length = dailyMods.length - 1;
	var dailyReduction = 0;

	for (var item in autoTrimpSettings.rDailyPortalSettingsArray.value) {
		if (item === 'portalZone' || item === 'portalChallenge') continue;
		if (!autoTrimpSettings.rDailyPortalSettingsArray.value[item].enabled) continue;
		var dailyReductionTemp = 0;
		var modifier = item;
		if (modifier.includes('Shred')) modifier = 'Every 15';
		if (modifier.includes('Weakness')) modifier = 'Enemies stack a debuff with each attack, reducing Trimp attack by';
		if (modifier.includes('Famine')) modifier = 'less Metal, Food, Wood, and Gems from all sources';
		if (modifier.includes('Large')) modifier = 'All housing can store';

		for (var x = 0; x < dailyMods.length; x++) {
			if (dailyMods[x].includes(modifier)) {
				if (modifier.includes('Every 15') && dailyMods[x].includes(item.split('Shred')[1]))
					dailyReductionTemp = autoTrimpSettings.rDailyPortalSettingsArray.value[item].zone
				else
					dailyReductionTemp = autoTrimpSettings.rDailyPortalSettingsArray.value[item].zone
			}
			if (dailyReduction > dailyReductionTemp) dailyReduction = dailyReductionTemp;
		}
	}
	return dailyReduction
}

function displayMostEfficientEquipment() {

	if (usingRealTimeOffline) return;
	var $eqNamePrestige = null;

	var highlightSetting = getPageSetting('rEquipEfficientEquipDisplay');
	if (!highlightSetting) {
		for (var item in game.equipment) {
			if (game.upgrades[RequipmentList[item].Upgrade].locked == 0) {
				$eqNamePrestige = document.getElementById(RequipmentList[item].Upgrade);
				if (document.getElementsByClassName(item).length == 0) {
					document.getElementById(RequipmentList[item].Upgrade).classList.add("efficient");
					document.getElementById(RequipmentList[item].Upgrade).classList.add(item);
				}
			}

			var $eqName = document.getElementById(item);
			if (!$eqName)
				continue;

			swapClass('efficient', 'efficientNo', $eqName)
			if ($eqNamePrestige != null)
				swapClass('efficient', 'efficientNo', $eqNamePrestige)
		}

	}
	if (!highlightSetting) return;

	for (var item in game.equipment) {
		if (game.equipment[item].locked) continue;
		if (item == "Shield") continue;
		var bestBuys = mostEfficientEquipment(1, true, true, false, true);
		var isAttack = (RequipmentList[item].Stat === 'attack' ? 0 : 1);
		var $eqNamePrestige = null;
		if (game.upgrades[RequipmentList[item].Upgrade].locked == 0) {
			$eqNamePrestige = document.getElementById(RequipmentList[item].Upgrade);
			if (document.getElementsByClassName(item).length == 0) {
				document.getElementById(RequipmentList[item].Upgrade).classList.add("efficient");
				document.getElementById(RequipmentList[item].Upgrade).classList.add(item);
			}
			if (document.getElementById(RequipmentList[item].Upgrade).classList.contains('efficientYes') && (item != bestBuys[isAttack] || (item == bestBuys[isAttack] && bestBuys[isAttack + 4] !== true)))
				swapClass('efficient', 'efficientNo', $eqNamePrestige)
		}
		if (item == bestBuys[isAttack] && bestBuys[isAttack + 4] === true) {
			bestBuys[isAttack] = RequipmentList[item].Upgrade;
			if (document.getElementById(item).classList.contains('efficientYes'))
				swapClass('efficient', 'efficientNo', document.getElementById(item))
			item = RequipmentList[item].Upgrade;
		}

		var $eqName = document.getElementById(item);
		if (!$eqName)
			continue;
		if (item == bestBuys[isAttack])
			swapClass('efficient', 'efficientYes', $eqName)
		else {
			swapClass('efficient', 'efficientNo', $eqName)
		}
	}
}

function displayDropdowns(universe, runType, MAZ) {

	//if (!runType) return;
	if (!universe) universe = game.global.universe;
	if (!MAZ) MAZ = '';
	var challengeList2 = [];

	if (runType === 'Gather') {
		var gatherDropdown = "<option value='food'" + ((MAZ == 'food') ? " selected='selected'" : "") + ">Food</option >\
		<option value='wood'" + ((MAZ == 'wood') ? " selected = 'selected'" : "") + " > Wood</option >\
		<option value='metal'" + ((MAZ == 'metal') ? " selected = 'selected'" : "") + " > Metal</option >\
		<option value='science'" + ((MAZ == 'science') ? " selected = 'selected'" : "") + " > Science</option > "
		return gatherDropdown;
	}

	var highestZone = universe === 1 ? game.global.highestLevelCleared + 1 : game.global.highestRadonLevelCleared + 1;
	if (universe === 1) {
		if (runType === 'Cache') {
			//Specials dropdown with conditions for each unlock to only appear when the user can run them.
			var specialsDropdown = "<option value='0'" + ((MAZ == '0') ? " selected='selected'" : "") + ">No Modifier</option>"
			if (highestZone >= 60) specialsDropdown += "<option value='fa'" + ((MAZ == 'fa') ? " selected='selected'" : "") + ">Fast Attack</option>\<option value='lc'" + ((MAZ == 'lc') ? " selected='selected'" : "") + ">Large Cache</option>"
			if (highestZone >= 85) specialsDropdown += "<option value = 'ssc'" + ((MAZ == 'ssc') ? " selected = 'selected'" : "") + " > Small Savory Cache</option >\
				<option value='swc'" + ((MAZ == 'swc') ? " selected = 'selected'" : "") + " > Small Wooden Cache</option >\
				<option value='smc'" + ((MAZ == 'smc') ? " selected = 'selected'" : "") + " > Small Metal Cache</option > "
			if (highestZone >= 135) specialsDropdown += "<option value='p'" + ((MAZ == 'p') ? " selected='selected'" : "") + ">Prestigious</option>"
			if (highestZone >= 160) specialsDropdown += "<option value='hc'" + ((MAZ == 'hc') ? " selected='selected'" : "") + ">Huge Cache</option>"
			if (highestZone >= 185) specialsDropdown += "<option value='lsc'" + ((MAZ == 'lsc') ? " selected='selected'" : "") + ">Large Savory Cache</option>\
				<option value='lwc'" + ((MAZ == 'lwc') ? " selected='selected'" : "") + ">Large Wooden Cache</option>\
				<option value='lmc'" + ((MAZ == 'lmc') ? " selected='selected'" : "") + ">Large Metal Cache</option>"
			return specialsDropdown;
		}
		if (runType === 'Filler') {
			challengeDropdown = "<option value='All'" + ((MAZ == 'All') ? " selected='selected'" : "") + ">All</option>";
			if (highestZone >= 40) challengeDropdown += "<option value='Balance'" + ((MAZ == 'Balance') ? " selected='selected'" : "") + ">Balance</option>";
			if (highestZone >= 55) challengeDropdown += "<option value = 'Decay'" + ((MAZ == 'Decay') ? " selected = 'selected'" : "") + " >Decay</option >";
			if (game.global.prisonClear >= 1) challengeDropdown += "<option value='Electricity'" + ((MAZ == 'Electricity') ? " selected='selected'" : "") + ">Electricity</option>";
			if (highestZone >= 110) challengeDropdown += "<option value='Life'" + ((MAZ == 'Life') ? " selected='selected'" : "") + ">Life</option>";
			if (highestZone >= 125) challengeDropdown += "<option value='Crushed'" + ((MAZ == 'Crushed') ? " selected='selected'" : "") + ">Crushed</option>";
			if (highestZone >= 145) challengeDropdown += "<option value='Nom'" + ((MAZ == 'Nom') ? " selected='selected'" : "") + ">Nom</option>";
			if (highestZone >= 165) challengeDropdown += "<option value='Toxicity'" + ((MAZ == 'Toxicity') ? " selected='selected'" : "") + ">Toxicity</option>";
			if (highestZone >= 180) challengeDropdown += "<option value='Watch'" + ((MAZ == 'Watch') ? " selected='selected'" : "") + ">Watch</option>";
			if (highestZone >= 180) challengeDropdown += "<option value='Lead'" + ((MAZ == 'Lead') ? " selected='selected'" : "") + ">Lead</option>";
			if (highestZone >= 190) challengeDropdown += "<option value='Corrupted'" + ((MAZ == 'Corrupted') ? " selected='selected'" : "") + ">Corrupted</option>";
			if (highestZone >= 215) challengeDropdown += "<option value='Domination'" + ((MAZ == 'Domination') ? " selected='selected'" : "") + ">Domination</option>";
			if (highestZone >= 600) challengeDropdown += "<option value='Experience'" + ((MAZ == 'Experience') ? " selected='selected'" : "") + ">Experience</option>";
			return challengeDropdown;
		}
		else if (runType === 'C3') {
			var challengeDropdown = "<option value='All'" + ((MAZ == 'All') ? " selected='selected'" : "") + ">All</option>";
			if (getTotalPerkResource(true) >= 30) challengeDropdown += "<option value='Discipline'" + ((MAZ == 'Discipline') ? " selected='selected'" : "") + ">Discipline</option>";
			if (highestZone >= 25) challengeDropdown += "<option value='Metal'" + ((MAZ == 'Metal') ? " selected='selected'" : "") + ">Metal</option>";
			if (highestZone >= 35) challengeDropdown += "<option value='Size'" + ((MAZ == 'Size') ? " selected='selected'" : "") + ">Size</option>";
			if (highestZone >= 40) challengeDropdown += "<option value = 'Balance'" + ((MAZ == 'Balance') ? " selected = 'selected'" : "") + " > Balance</option >";
			if (highestZone >= 45) challengeDropdown += "<option value='Meditate'" + ((MAZ == 'Meditate') ? " selected='selected'" : "") + ">Meditate</option>";
			if (highestZone >= 60) challengeDropdown += "<option value='Trimp'" + ((MAZ == 'Trimp') ? " selected='selected'" : "") + ">Trimp</option>";
			if (highestZone >= 70) challengeDropdown += "<option value='Trapper'" + ((MAZ == 'Trapper') ? " selected='selected'" : "") + ">Trapper</option>";
			if (game.global.prisonClear >= 1) challengeDropdown += "<option value='Electricity'" + ((MAZ == 'Electricity') ? " selected='selected'" : "") + ">Electricity</option>";
			if (highestZone >= 120) challengeDropdown += "<option value='Coordinate'" + ((MAZ == 'Coordinate') ? " selected='selected'" : "") + ">Coordinate</option>";
			if (highestZone >= 130) challengeDropdown += "<option value='Slow'" + ((MAZ == 'Slow') ? " selected='selected'" : "") + ">Slow</option>";
			if (highestZone >= 145) challengeDropdown += "<option value='Nom'" + ((MAZ == 'Nom') ? " selected='selected'" : "") + ">Nom</option>";
			if (highestZone >= 150) challengeDropdown += "<option value='Mapology'" + ((MAZ == 'Mapology') ? " selected='selected'" : "") + ">Mapology</option>";
			if (highestZone >= 165) challengeDropdown += "<option value='Toxicity'" + ((MAZ == 'Toxicity') ? " selected='selected'" : "") + ">Toxicity</option>";
			if (highestZone >= 180) challengeDropdown += "<option value='Watch'" + ((MAZ == 'Watch') ? " selected='selected'" : "") + ">Watch</option>";
			if (highestZone >= 180) challengeDropdown += "<option value='Lead'" + ((MAZ == 'Lead') ? " selected='selected'" : "") + ">Lead</option>";
			if (highestZone >= 425) challengeDropdown += "<option value='Obliterated'" + ((MAZ == 'Obliterated') ? " selected='selected'" : "") + ">Obliterated</option>";
			if (game.global.totalSquaredReward >= 4500) challengeDropdown += "<option value='Eradicated'" + ((MAZ == 'Eradicated') ? " selected='selected'" : "") + ">Eradicated</option>";
			return challengeDropdown;
		}
	}

	if (universe === 2) {
		if (MAZ !== '') {
			if (runType === 'Cache') {
				//Specials dropdown with conditions for each unlock to only appear when the user can run them.
				var specialsDropdown = "<option value='0'" + ((MAZ == '0') ? " selected='selected'" : "") + ">No Modifier</option>"
				if (highestZone >= 15) specialsDropdown += "<option value='fa'" + ((MAZ == 'fa') ? " selected='selected'" : "") + ">Fast Attack</option>\<option value='lc'" + ((MAZ == 'lc') ? " selected='selected'" : "") + ">Large Cache</option>"
				if (highestZone >= 25) specialsDropdown += "<option value = 'ssc'" + ((MAZ == 'ssc') ? " selected = 'selected'" : "") + " > Small Savory Cache</option >\
				<option value='swc'" + ((MAZ == 'swc') ? " selected = 'selected'" : "") + " > Small Wooden Cache</option >\
				<option value='smc'" + ((MAZ == 'smc') ? " selected = 'selected'" : "") + " > Small Metal Cache</option > "
				if (game.global.ArchaeologyDone) specialsDropdown += "<option value='src'" + ((MAZ == 'src') ? " selected='selected'" : "") + ">Small Research Cache</option>"
				if (highestZone >= 55) specialsDropdown += "<option value='p'" + ((MAZ == 'p') ? " selected='selected'" : "") + ">Prestigious</option>"
				if (highestZone >= 65) specialsDropdown += "<option value='hc'" + ((MAZ == 'hc') ? " selected='selected'" : "") + ">Huge Cache</option>"
				if (highestZone >= 85) specialsDropdown += "<option value='lsc'" + ((MAZ == 'lsc') ? " selected='selected'" : "") + ">Large Savory Cache</option>\
				<option value='lwc'" + ((MAZ == 'lwc') ? " selected='selected'" : "") + ">Large Wooden Cache</option>\
				<option value='lmc'" + ((MAZ == 'lmc') ? " selected='selected'" : "") + ">Large Metal Cache</option>"
				if (game.global.ArchaeologyDone) specialsDropdown += "<option value='lrc'" + ((MAZ == 'lrc') ? " selected='selected'" : "") + ">Large Research Cache</option>"
				return specialsDropdown;
			}
			if (runType === 'Filler') {
				challengeDropdown = "<option value='All'" + ((MAZ == 'All') ? " selected='selected'" : "") + ">All</option>";
				if (highestZone >= 40) challengeDropdown += "<option value='Bublé'" + ((MAZ == 'Bublé') ? " selected='selected'" : "") + ">Bublé</option>";
				if (highestZone >= 55) challengeDropdown += "<option value = 'Melt'" + ((MAZ == 'Melt') ? " selected = 'selected'" : "") + " > Melt</option >";
				if (highestZone >= 70) challengeDropdown += "<option value='Quagmire'" + ((MAZ == 'Quagmire') ? " selected='selected'" : "") + ">Quagmire</option>";
				if (highestZone >= 90) challengeDropdown += "<option value='Archaeology'" + ((MAZ == 'Archaeology') ? " selected='selected'" : "") + ">Archaeology</option>";
				if (highestZone >= 110) challengeDropdown += "<option value='Insanity'" + ((MAZ == 'Insanity') ? " selected='selected'" : "") + ">Insanity</option>";
				if (highestZone >= 135) challengeDropdown += "<option value='Nurture'" + ((MAZ == 'Nurture') ? " selected='selected'" : "") + ">Nurture</option>";
				if (highestZone >= 155) challengeDropdown += "<option value='Alchemy'" + ((MAZ == 'Alchemy') ? " selected='selected'" : "") + ">Alchemy</option>";
				if (highestZone >= 175) challengeDropdown += "<option value='Hypothermia'" + ((MAZ == 'Hypothermia') ? " selected='selected'" : "") + ">Hypothermia</option>";
				return challengeDropdown;
			}
			else if (runType === 'C3') {
				var challengeDropdown = "<option value='All'" + ((MAZ == 'All') ? " selected='selected'" : "") + ">All</option>";
				if (highestZone >= 15) challengeDropdown += "<option value='Unlucky'" + ((MAZ == 'Unlucky') ? " selected='selected'" : "") + ">Unlucky</option>";
				if (highestZone >= 20) challengeDropdown += "<option value='Downsize'" + ((MAZ == 'Downsize') ? " selected='selected'" : "") + ">Downsize</option>";
				if (highestZone >= 25) challengeDropdown += "<option value='Transmute'" + ((MAZ == 'Transmute') ? " selected='selected'" : "") + ">Transmute</option>";
				if (highestZone >= 35) challengeDropdown += "<option value = 'Unbalance'" + ((MAZ == 'Unbalance') ? " selected = 'selected'" : "") + " > Unbalance</option >";
				if (highestZone >= 45) challengeDropdown += "<option value='Duel'" + ((MAZ == 'Duel') ? " selected='selected'" : "") + ">Duel</option>";
				if (highestZone >= 60) challengeDropdown += "<option value='Trappapalooza'" + ((MAZ == 'Trappapalooza') ? " selected='selected'" : "") + ">Trappa</option>";
				if (highestZone >= 70) challengeDropdown += "<option value='Wither'" + ((MAZ == 'Wither') ? " selected='selected'" : "") + ">Wither</option>";
				if (highestZone >= 85) challengeDropdown += "<option value='Quest'" + ((MAZ == 'Quest') ? " selected='selected'" : "") + ">Quest</option>";
				if (highestZone >= 100) challengeDropdown += "<option value='Mayhem'" + ((MAZ == 'Mayhem') ? " selected='selected'" : "") + ">Mayhem</option>";
				if (highestZone >= 105) challengeDropdown += "<option value='Storm'" + ((MAZ == 'Storm') ? " selected='selected'" : "") + ">Storm</option>";
				if (highestZone >= 115) challengeDropdown += "<option value='Berserk'" + ((MAZ == 'Berserk') ? " selected='selected'" : "") + ">Berserk</option>";
				if (highestZone >= 150) challengeDropdown += "<option value='Pandemonium'" + ((MAZ == 'Pandemonium') ? " selected='selected'" : "") + ">Pandemonium</option>";
				if (highestZone >= 175) challengeDropdown += "<option value='Glass'" + ((MAZ == 'Glass') ? " selected='selected'" : "") + ">Glass</option>";
				if (highestZone >= 201) challengeDropdown += "<option value='Smithless'" + ((MAZ == 'Smithless') ? " selected='selected'" : "") + ">Smithless</option>";
				return challengeDropdown;
			}
		}/* 
		else if (runType === 'Filler') {
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 40) challengeList2.push("Bublé");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 55) challengeList2.push("Melt");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 70) challengeList2.push("Quagmire");
			if (getPageSetting('rDisplayAllSettings') || highestZone > 90) challengeList2.push("Archaeology");
			if (getPageSetting('rDisplayAllSettings') || highestZone > 100) challengeList2.push("Mayhem");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 110) challengeList2.push("Insanity");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 135) challengeList2.push("Nurture");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 150) challengeList2.push("Pandemonium");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 155) challengeList2.push("Alchemy");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 175) challengeList2.push("Hypothermia");
		}
		else if (runType === 'C3') {
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 15) challengeList2.push("Unlucky");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 20) challengeList2.push("Downsize");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 25) challengeList2.push("Transmute");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 35) challengeList2.push("Unbalance");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 45) challengeList2.push("Duel");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 60) challengeList2.push("Trappapalooza");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 70) challengeList2.push("Wither");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 85) challengeList2.push("Quest");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 105) challengeList2.push("Storm");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 115) challengeList2.push("Berserk");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 175) challengeList2.push("Glass");
			if (getPageSetting('rDisplayAllSettings') || highestZone >= 201) challengeList2.push("Smithless");
		} */
	}

	return challengeList2;
}