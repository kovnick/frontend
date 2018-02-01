import * as React from "react";
import FadeImage from "components/misc/FadeImage";
import "./seasoncard.scss";
import { SEASONS, RANKS, REGIONS } from "lib/constants";
import Icon, { GLYPHS } from "components/misc/Icon";
import Stat from "components/misc/Stat";
import { getRankWinChance } from "lib/stats";

import s1 from "assets/backgrounds/blackice1.jpg";
import s2 from "assets/backgrounds/dustline1.jpg";
import s3 from "assets/backgrounds/skullrain1.jpg";
import s4 from "assets/backgrounds/redcrow1.jpg";
import s5 from "assets/backgrounds/velvetshell1.jpg";
import s6 from "assets/backgrounds/ophealth1.jpg";
import s7 from "assets/backgrounds/bloodorchid1.jpg";
import s8 from "assets/backgrounds/whitenoise1.jpg";

const imageMap = {
    1: s1,
    2: s2,
    3: s3,
    4: s4,
    5: s5,
    6: s6,
    7: s7,
    8: s8,
    default: s3,
};

const logoMap = {
    1: GLYPHS.LOGOS1,
    2: GLYPHS.LOGOS2,
    3: GLYPHS.LOGOS3,
    4: GLYPHS.LOGOS4,
    5: GLYPHS.LOGOS5,
    6: GLYPHS.LOGOS6,
    7: GLYPHS.LOGOS7,
    8: GLYPHS.LOGOS8,
    9: GLYPHS.LOGOS9,
    default: GLYPHS.LOGODEFAULT,
};


function getImage(season) {
    return imageMap[season] || imageMap.default;
}

function getLogo(season) {
    return logoMap[season] || logoMap.default;
}

interface SeasonStats {
    wins: number;
    losses: number;
    abandons: number;
    mmr: number;
    max_mmr: number;
    rank: number;
    max_rank: number;
    skill_mean: number;
    skill_stdev: number;
}
interface RegionStatsProps extends SeasonStats {
    region: string;
}
interface ISeasonCardProps {
    season: number;
    apac: SeasonStats;
    emea: SeasonStats;
    ncsa: SeasonStats;
}

interface ISeasonCardState {
    extended: boolean;
}

export default class SeasonCard extends React.Component<ISeasonCardProps, ISeasonCardState> {
    constructor(props) {
        super(props);
        this.state = {
            extended: false,
        };
    }
    render() {
        return (
            <div className={`seasoncard seasoncard--season-${this.props.season}`}>
                <FadeImage className="seasoncard__image" src={getImage(this.props.season)} />

                <div className="seasoncard__content">
                    <Icon className="seasoncard__season" glyph={getLogo(this.props.season)} />
                    <div className="seasoncard__regions">
                        <RegionStats region={REGIONS.emea} {...this.props.emea} />
                        <RegionStats region={REGIONS.ncsa} {...this.props.ncsa} />
                        <RegionStats region={REGIONS.apac} {...this.props.apac} />
                    </div>
                </div>

            </div>
        );
    }
}

function RegionStats(region: RegionStatsProps) {
    if (region.rank === 0) {
        return (
            <div className="regionstats">
                <header className="regionstats__header">
                    <div className="regionstats__headertext">
                        <div className="regionstats__region">{region.region}</div>
                        <div className="regionstats__rank">Unranked</div>
                    </div>
                    <Icon className="regionstats__rankicon" glyph={GLYPHS["RANK" + 0]} />
                </header>
                <div className="regionstats__stats regionstats__stats--empty">
                    <div className="regionstats__emptyindicator" />
                </div>
            </div>
        );
    }
    return (
        <div className="regionstats">
            <header className="regionstats__header">
                <div className="regionstats__headertext">
                    <div className="regionstats__region">{region.region}</div>
                    <div className="regionstats__rank">{RANKS[region.rank]}</div>
                </div>
                <Icon className="regionstats__rankicon" glyph={GLYPHS["RANK" + region.rank]} />
            </header>
            <div className="regionstats__stats">
                {/*
                <Stat label="rank">{RANKS[region.rank]}</Stat>
                <Stat label="max rank">{RANKS[region.max_rank]}</Stat>
                */}
                <Stat label="MMR">{region.mmr.toFixed(2)}</Stat>
                <Stat label="max MMR">{region.max_mmr.toFixed(2)}</Stat>
                <Stat label="won">{region.wins}</Stat>
                <Stat label="lost">{region.losses}</Stat>
                <Stat label="abandoned">{region.abandons}</Stat>
                <Stat label="win %">{getRankWinChance(region)}</Stat>
            </div>
        </div>
    );
}
