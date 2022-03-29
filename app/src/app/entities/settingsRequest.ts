import { BowSprite } from './enum/bowSprite';
import { CoinColor } from './enum/coinColor';
import { GoombarioSprite } from './enum/goombarioSprite';
import { KooperSprite } from './enum/kooperSprite';
import { MarioSprite } from './enum/marioSprite';
import { SpriteSetting } from './enum/spriteSetting';
export interface SettingsRequest {
    StarRodModVersion: number;
    SettingsString: string;
    AlwaysSpeedySpin: boolean;
    AlwaysISpy: boolean;
    AlwaysPeekaboo: boolean;
    HiddenBlockMode: number;
    AllowPhysicsGlitches: boolean;
    StartingCoins: number;
    CapEnemyXP: boolean;
    NoXP: boolean;
    DoubleDamage: boolean;
    QuadrupleDamage: boolean;
    OHKO: boolean;
    NoSaveBlocks: boolean;
    NoHeartBlocks: boolean;
    FlowerGateOpen: boolean;
    BlueHouseOpen: boolean;
    ToyboxOpen: boolean;
    WhaleOpen: boolean;
    ShuffleChapterDifficulty: boolean;
    ProgressiveScaling: boolean;
    RandomFormations: boolean;
    ShuffleItems: boolean;
    IncludeCoins: boolean;
    IncludeShops: boolean;
    IncludePanels: boolean;
    IncludeFavors: boolean;
    IncludeLetterChain: boolean;
    KeyitemsOutsideDungeon: boolean;
    RandomBadgesBP: number;
    RandomBadgesFP: number;
    RandomPartnerFP: number;
    RandomStarpowerSP: number;
    RandomQuiz: boolean;
    SkipQuiz: boolean;
    QuizmoAlwaysAppears: boolean;
    PartnersInDefaultLocations: boolean;
    PartnersAlwaysUsable: boolean;
    StartWithRandomPartners: boolean;
    RandomPartnersMin?: number;
    RandomPartnersMax?: number;
    StartWithPartners?: StartingPartners;
    WriteSpoilerLog : boolean;
    RomanNumerals: boolean;
    TurnOffMusic: boolean;
    IncludeDojo: boolean;
    ShortenBowsersCastle: boolean;
    ShortenCutscenes: boolean;
    SkipEpilogue: boolean;
    Box5ColorA: number;
    Box5ColorB: number;    
    RandomCoinColor: boolean;
    CoinColor: CoinColor;
    MarioSetting: SpriteSetting;
    MarioSprite: MarioSprite;
    GoombarioSetting: SpriteSetting;
    GoombarioSprite: GoombarioSprite;
    KooperSetting: SpriteSetting;
    KooperSprite: KooperSprite;
    BowSetting: SpriteSetting;
    BowSprite: BowSprite;
    BossesSetting: SpriteSetting;
    NPCSetting: SpriteSetting;
    StartingMaxHP: number;
    StartingMaxFP: number;
    StartingMaxBP: number;
    StartingStarPower: number;
    StartingItem0: number;
    StartingItem1: number;
    StartingItem2: number;
    StartingItem3: number;
    StartingItem4: number;
    StartingItem5: number;
    StartingItem6: number;
    StartingItem7: number;
    StartingItem8: number;
    StartingItem9: number;
    StartingItemA: number;
    StartingItemB: number;
    StartingItemC: number;
    StartingItemD: number;
    StartingItemE: number;
    StartingItemF?: number;
    ItemScarcity: number;
    StarWaySpiritsNeeded: number;
    FoliageItemHints: boolean;
    RandomText: boolean;
    NoHealingItems: boolean;
    StartWithRandomItems: boolean;
    RandomItemsMin: number;
    RandomItemsMax: number;
    AddItemPouches: boolean;
    RandomChoice: boolean; // Mystery Random On Every Use
    MysteryRandomPick: boolean; // Mystery Random Pick
}

export interface StartingPartners {
    Goombario: boolean;
    Kooper: boolean;
    Bombette: boolean;
    Parakarry: boolean;
    Bow: boolean;
    Watt: boolean;
    Sushie: boolean;
    Lakilester: boolean;
}