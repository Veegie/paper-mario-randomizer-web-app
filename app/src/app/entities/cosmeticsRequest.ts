import { MusicMode } from './enum/musicMode';
import { ParakarrySprite } from './enum/parakarrySprite';
import { BombetteSprite } from './enum/bombetteSprite';
import { BowSprite } from './enum/bowSprite';
import { CoinColor } from './enum/coinColor';
import { GoombarioSprite } from './enum/goombarioSprite';
import { KooperSprite } from './enum/kooperSprite';
import { MarioSprite } from './enum/marioSprite';
import { SpriteSetting } from './enum/spriteSetting';
import { SushieSprite } from './enum/sushieSprite';
import { WattSprite } from './enum/wattSprite';
import { LakilesterSprite } from './enum/lakilesterSprite';
import { StatusBarColorMode } from './enum/statusBarColorMode';

export interface CosmeticsRequest {
    SeedID: string
    RomanNumerals: boolean;
    ColorMode: StatusBarColorMode;
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
    BombetteSetting: SpriteSetting;
    BombetteSprite: BombetteSprite;
    ParakarrySetting: SpriteSetting;
    ParakarrySprite: ParakarrySprite;
    BowSetting: SpriteSetting;
    BowSprite: BowSprite;
    WattSetting: SpriteSetting;
    WattSprite: WattSprite;
    SushieSetting: SpriteSetting;
    SushieSprite: SushieSprite;
    LakilesterSetting: SpriteSetting;
    LakilesterSprite: LakilesterSprite;
    BossesSetting: SpriteSetting;
    NPCSetting: SpriteSetting;
    EnemiesSetting: SpriteSetting;
    RandomText: boolean;
    RandomPitch: boolean;
    ShuffleMusic: boolean;
    ShuffleMusicMode: MusicMode;
    ShuffleJingles: boolean;
}
