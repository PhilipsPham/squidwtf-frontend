"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';

interface Album {
  maximum_bit_depth: number;
  copyright: string;
  performers: string;
  audio_info: {
    replaygain_track_peak: number;
    replaygain_track_gain: number;
  };
  performer: {
    name: string;
    id: number;
  };
  album: {
    image: {
      small: string;
      thumbnail: string;
      large: string;
    };
    maximum_bit_depth: number;
    media_count: number;
    artist: {
      image: string | null;
      name: string;
      id: number;
      albums_count: number;
      slug: string;
      picture: string | null;
    };
    upc: string;
    released_at: number;
    label: {
      name: string;
      id: number;
      albums_count: number;
      supplier_id: number;
      slug: string;
    };
    title: string;
    qobuz_id: number;
    version: string | null;
    duration: number;
    parental_warning: boolean;
    tracks_count: number;
    popularity: number;
    genre: {
      path: number[];
      color: string;
      name: string;
      id: number;
      slug: string;
    };
    maximum_channel_count: number;
    id: string;
    maximum_sampling_rate: number;
    previewable: boolean;
    sampleable: boolean;
    displayable: boolean;
    streamable: boolean;
    streamable_at: number;
    downloadable: boolean;
    purchasable_at: number | null;
    purchasable: boolean;
    release_date_original: string;
    release_date_download: string;
    release_date_stream: string;
    release_date_purchase: string;
    hires: boolean;
    hires_streamable: boolean;
    maximum_technical_specifications?: string;
  };
  work: null;
  composer: {
    name: string;
    id: number;
  };
  isrc: string;
  title: string;
  version: string | null;
  duration: number;
  parental_warning: boolean;
  track_number: number;
  maximum_channel_count: number;
  id: number;
  media_number: number;
  maximum_sampling_rate: number;
  release_date_original: string;
  release_date_download: string;
  release_date_stream: string;
  release_date_purchase: string;
  purchasable: boolean;
  streamable: boolean;
  previewable: boolean;
  sampleable: boolean;
  downloadable: boolean;
  displayable: boolean;
  purchasable_at: number;
  streamable_at: number;
  hires: boolean;
  hires_streamable: boolean;
  maximum_technical_specifications?: string;
  url?: string;
  streamUrl?: string;
}

const mockData: { success: boolean; data: { query: string; tracks: { items: Album[] } } } = {
  success: true,
  data: {
    query: "taylor",
    tracks: {
      items: [
        { "maximum_bit_depth": 24, "copyright": "℗ 2025 Universal Music New Zealand Limited", "performers": "Chris Gehringer, MasteringEngineer - Will Quinnell, MasteringEngineer - Mark 'Spike' Stent, MixingEngineer - Jack Manning, AdditionalEngineer - Dev Hynes, Synthesizer, ElectricGuitar - Andrew Aged, ElectricGuitar - Jim-E Stack, Producer, Engineer, Programmer, Synthesizer, Keyboard, DrumMachine, DrumProgrammer - James Harmon Stack, ComposerLyricist - Lorde, Producer, MainArtist - Ella Marija Lani Yelich-O'Connor, Vocalist, ComposerLyricist - Eli Teplin, Piano, Synthesizer - Ian Gold, Engineer - Koby Berman, AdditionalEngineer", "audio_info": { "replaygain_track_peak": 0.977264, "replaygain_track_gain": -11.95 }, "performer": { "name": "Lorde", "id": 1195379 }, "album": { "image": { "small": "https://static.qobuz.com/images/covers/yc/71/b3fogo6m771yc_230.jpg", "thumbnail": "https://static.qobuz.com/images/covers/yc/71/b3fogo6m771yc_50.jpg", "large": "https://static.qobuz.com/images/covers/yc/71/b3fogo6m771yc_600.jpg" }, "maximum_bit_depth": 24, "media_count": 1, "artist": { "image": null, "name": "Lorde", "id": 1195379, "albums_count": 100, "slug": "lorde", "picture": null }, "upc": "0602478128424", "released_at": 1750975200, "label": { "name": "Universal Music New Zealand Limited", "id": 210773, "albums_count": 1127, "supplier_id": 1, "slug": "universalmusicnewzealandlimited" }, "title": "Virgin", "qobuz_id": 343367689, "version": null, "duration": 2091, "parental_warning": true, "tracks_count": 11, "popularity": 0, "genre": { "path": [ 112, 117 ], "color": "#5eabc1", "name": "Pop", "id": 117, "slug": "pop" }, "maximum_channel_count": 2, "id": "b3fogo6m771yc", "maximum_sampling_rate": 44.1, "previewable": true, "sampleable": true, "displayable": true, "streamable": true, "streamable_at": 1751320800, "downloadable": false, "purchasable_at": null, "purchasable": false, "release_date_original": "2025-06-27", "release_date_download": "2025-06-27", "release_date_stream": "2025-06-27", "release_date_purchase": "2025-06-27", "hires": true, "hires_streamable": true }, "work": null, "composer": { "name": "Lorde", "id": 1195379 }, "isrc": "NZUM72500024", "title": "Favourite Daughter", "version": null, "duration": 208, "parental_warning": false, "track_number": 5, "maximum_channel_count": 2, "id": 343367694, "media_number": 1, "maximum_sampling_rate": 44.1, "release_date_original": "2025-06-27", "release_date_download": "2025-06-27", "release_date_stream": "2025-06-27", "release_date_purchase": "2025-06-27", "purchasable": true, "streamable": true, "previewable": true, "sampleable": true, "downloadable": true, "displayable": true, "purchasable_at": 1751320800, "streamable_at": 1751320800, "hires": true, "hires_streamable": true }, { "maximum_bit_depth": 24, "copyright": "2025 Jagjaguwar 2025 Jagjaguwar", "performers": "Kobalt Music Publishing Ltd., MusicPublisher - Tom Healy, Producer, Mixer, Bass - Joe Carra, Masterer - Jeanie Pilkington, Vocals, ComposerLyricist - Anita Clark, Violin - Grace Sinclair, ComposerLyricist - Folk Bitch Trio, Producer, MainArtist - Heide Peverelle, Vocals, ComposerLyricist - Gracie Sinclair, Guitar, Vocals - Ophir Admony, A&R Direction - Sebi White, Designer", "audio_info": { "replaygain_track_peak": 0.966003, "replaygain_track_gain": -5.37 }, "performer": { "name": "Folk Bitch Trio", "id": 12919876 }, "album": { "image": { "small": "https://static.qobuz.com/images/covers/tb/oz/vuav960owoztb_230.jpg", "thumbnail": "https://static.qobuz.com/images/covers/tb/oz/vuav960owoztb_50.jpg", "large": "https://static.qobuz.com/images/covers/tb/oz/vuav960owoztb_600.jpg" }, "maximum_bit_depth": 24, "media_count": 1, "artist": { "image": null, "name": "Folk Bitch Trio", "id": 12919876, "albums_count": 11, "slug": "folk-bitch-trio", "picture": null }, "upc": "0617308101751", "released_at": 1750716000, "label": { "name": "Jagjaguwar", "id": 100011, "albums_count": 743, "supplier_id": 70, "slug": "jagjaguwar-1" }, "title": "Moth Song", "qobuz_id": 339332534, "version": null, "duration": 921, "parental_warning": true, "tracks_count": 4, "popularity": 0, "genre": { "path": [ 112, 119, 113 ], "color": "#5eabc1", "name": "Alternative en Indie", "id": 113, "slug": "alternatif-et-inde" }, "maximum_channel_count": 2, "id": "vuav960owoztb", "maximum_sampling_rate": 96, "previewable": true, "sampleable": true, "displayable": true, "streamable": true, "streamable_at": 1750716000, "downloadable": false, "purchasable_at": null, "purchasable": false, "release_date_original": "2025-06-24", "release_date_download": "2025-06-24", "release_date_stream": "2025-06-24", "release_date_purchase": "2025-06-24", "hires": true, "hires_streamable": true }, "work": null, "composer": { "name": "Grace Sinclair", "id": 3026713 }, "isrc": "US38Y2547104", "title": "Moth Song", "version": null, "duration": 303, "parental_warning": false, "track_number": 1, "maximum_channel_count": 2, "id": 339332535, "media_number": 1, "maximum_sampling_rate": 96, "release_date_original": "2025-06-24", "release_date_download": "2025-06-24", "release_date_stream": "2025-06-24", "release_date_purchase": "2025-06-24", "purchasable": true, "streamable": true, "previewable": true, "sampleable": true, "downloadable": true, "displayable": true, "purchasable_at": 1750716000, "streamable_at": 1750716000, "hires": true, "hires_streamable": true }, { "maximum_bit_depth": 24, "copyright": "2025 Chrysalis Records Limited 2025 Chrysalis Records Limited", "performers": "Sam Taylor, Guitar, Piano - Tom Healy, Guitar, Keyboards - Nadia Reid, MainArtist - Thomas Healy, Producer, Engineer - Joe McCallum, Drums, Percussion - Blue Raincoat Music Publishing Ltd, MusicPublisher - Richie Pickard, Bass - Nadia Reid O’Reily, Guitar, Vocals, ComposerLyricist", "audio_info": { "replaygain_track_peak": 0.989655, "replaygain_track_gain": -7.96 }, "performer": { "name": "Nadia Reid", "id": 2407695 }, "album": { "image": { "small": "https://static.qobuz.com/images/covers/eb/xz/xh5cypdsoxzeb_230.jpg", "thumbnail": "https://static.qobuz.com/images/covers/eb/xz/xh5cypdsoxzeb_50.jpg", "large": "https://static.qobuz.com/images/covers/eb/xz/xh5cypdsoxzeb_600.jpg" }, "maximum_bit_depth": 24, "media_count": 1, "artist": { "image": null, "name": "Nadia Reid", "id": 2407695, "albums_count": 91, "slug": "nadia-reid", "picture": null }, "upc": "0840401718056", "released_at": 1750802400, "label": { "name": "Chrysalis Records", "id": 4598274, "albums_count": 93, "supplier_id": 70, "slug": "chrysalis-records-6" }, "title": "Moment By", "qobuz_id": 339108839, "version": null, "duration": 280, "parental_warning": false, "tracks_count": 1, "popularity": 0, "genre": { "path": [ 112, 119, 113 ], "color": "#5eabc1", "name": "Alternative en Indie", "id": 113, "slug": "alternatif-et-inde" }, "maximum_channel_count": 2, "id": "xh5cypdsoxzeb", "maximum_sampling_rate": 96, "previewable": true, "sampleable": true, "displayable": true, "streamable": true, "streamable_at": 1750802400, "downloadable": false, "purchasable_at": null, "purchasable": false, "release_date_original": "2025-06-25", "release_date_download": "2025-06-25", "release_date_stream": "2025-06-25", "release_date_purchase": "2025-06-25", "hires": true, "hires_streamable": true }, "work": null, "composer": { "name": "Nadia Reid O’Reily", "id": 27203986 }, "isrc": "UKKP22501218", "title": "Moment By", "version": null, "duration": 280, "parental_warning": false, "track_number": 1, "maximum_channel_count": 2, "id": 339108840, "media_number": 1, "maximum_sampling_rate": 96, "release_date_original": "2025-06-25", "release_date_download": "2025-06-25", "release_date_stream": "2025-06-25", "release_date_purchase": "2025-06-25", "purchasable": true, "streamable": true, "previewable": true, "sampleable": true, "downloadable": true, "displayable": true, "purchasable_at": 1750802400, "streamable_at": 1750802400, "hires": true, "hires_streamable": true }, { "maximum_bit_depth": 24, "copyright": "2025 Anti 2025 Anti", "performers": "Joe Lambert, MasteringEngineer - Michael Howell, RecordingEngineer, AssistantProducer - Jonathan Pearce, Composer, Lyricist, Producer, MixingEngineer, RecordingEngineer - Bevan Smith, MixingEngineer - The Beths, MainArtist - Concord Music Publishing, MusicPublisher - Tristan Deck, Composer, Lyricist - Elizabeth Stokes, Composer, Lyricist - Benjamin Sinclair, Composer, Lyricist", "audio_info": { "replaygain_track_peak": 0.99585, "replaygain_track_gain": -9.02 }, "performer": { "name": "The Beths", "id": 2736400 }, "album": { "image": { "small": "https://static.qobuz.com/images/covers/wb/p8/nfv7za0f3p8wb_230.jpg", "thumbnail": "https://static.qobuz.com/images/covers/wb/p8/nfv7za0f3p8wb_50.jpg", "large": "https://static.qobuz.com/images/covers/wb/p8/nfv7za0f3p8wb_600.jpg" }, "maximum_bit_depth": 24, "media_count": 1, "artist": { "image": null, "name": "The Beths", "id": 2736400, "albums_count": 89, "slug": "the-beths", "picture": null }, "upc": "0045778813162", "released_at": 1756418400, "label": { "name": "Anti - Epitaph", "id": 599065, "albums_count": 976, "supplier_id": 41, "slug": "anti-epitaph-140" }, "title": "Straight Line Was A Lie", "qobuz_id": 338014097, "version": null, "duration": 2617, "parental_warning": false, "tracks_count": 10, "popularity": 0, "genre": { "path": [ 112, 119, 113 ], "color": "#5eabc1", "name": "Alternative en Indie", "id": 113, "slug": "alternatif-et-inde" }, "maximum_channel_count": 2, "id": "nfv7za0f3p8wb", "maximum_sampling_rate": 96, "previewable": false, "sampleable": false, "displayable": true, "streamable": true, "streamable_at": 1750802400, "downloadable": false, "purchasable_at": null, "purchasable": false, "release_date_original": "2025-08-29", "release_date_download": "2025-08-29", "release_date_stream": "2025-08-29", "release_date_purchase": "2025-08-29", "hires": true, "hires_streamable": true }, "work": null, "composer": { "name": "Elizabeth Stokes", "id": 4179127 }, "isrc": "USEP42520004", "title": "No Joy", "version": null, "duration": 197, "parental_warning": false, "track_number": 3, "maximum_channel_count": 2, "id": 338014100, "media_number": 1, "maximum_sampling_rate": 96, "release_date_original": "2025-08-29", "release_date_download": "2025-08-29", "release_date_stream": "2025-08-29", "release_date_purchase": "2025-08-29", "purchasable": true, "streamable": true, "previewable": false, "sampleable": false, "downloadable": true, "displayable": true, "purchasable_at": 1750802400, "streamable_at": 1750802400, "hires": true, "hires_streamable": true }, { "maximum_bit_depth": 24, "copyright": "℗ 2025 Ourness Pty Ltd", "performers": "Joey Waronker, Engineer, DrumKit - Michael Harris, Engineer - ANDREW KLIPPEL, A&R - Randy Merrill, MasteringEngineer - Omer Fedi, Producer, Guitar, Bass, Synthesizer, ComposerLyricist, DrumProgrammer - Blake Slatkin, Producer, Engineer, Synthesizer, ComposerLyricist, DrumProgrammer - Royel Otis, MainArtist - Otis Pavlovic, Vocalist, ComposerLyricist - Alex Anastasi, AAndRCoordinator - Royel Maddell, Guitar, Bass, Vocalist, ComposerLyricist - Nikki Young, AAndRAdministrator - Lillia Parsa, A&R - Ben Beptile, MixingEngineer", "audio_info": { "replaygain_track_peak": 0.977264, "replaygain_track_gain": -10.38 }, "performer": { "name": "Royel Otis", "id": 8100523 }, "album": { "image": { "small": "https://static.qobuz.com/images/covers/ub/vv/k05mwh87zvvub_230.jpg", "thumbnail": "https://static.qobuz.com/images/covers/ub/vv/k05mwh87zvvub_50.jpg", "large": "https://static.qobuz.com/images/covers/ub/vv/k05mwh87zvvub_600.jpg" }, "maximum_bit_depth": 24, "media_count": 1, "artist": { "image": null, "name": "Royel Otis", "id": 8100523, "albums_count": 72, "slug": "royel-otis", "picture": null }, "upc": "0602478464850", "released_at": 1750802400, "label": { "name": "Ourness  -  Capitol Records", "id": 8328836, "albums_count": 4, "supplier_id": 1, "slug": "ourness-capitol-records" }, "title": "car", "qobuz_id": 342016049, "version": null, "duration": 197, "parental_warning": false, "tracks_count": 1, "popularity": 0, "genre": { "path": [ 112, 119, 113 ], "color": "#5eabc1", "name": "Alternative en Indie", "id": 113, "slug": "alternatif-et-inde" }, "maximum_channel_count": 2, "id": "k05mwh87zvvub", "maximum_sampling_rate": 44.1, "previewable": true, "sampleable": true, "displayable": true, "streamable": true, "streamable_at": 1750802400, "downloadable": false, "purchasable_at": null, "purchasable": false, "release_date_original": "2025-06-25", "release_date_download": "2025-06-25", "release_date_stream": "2025-06-25", "release_date_purchase": "2025-06-25", "hires": true, "hires_streamable": true }, "work": null, "composer": { "name": "Blake Slatkin", "id": 4003749 }, "isrc": "USUG12503059", "title": "car", "version": null, "duration": 197, "parental_warning": false, "track_number": 1, "maximum_channel_count": 2, "id": 342016050, "media_number": 1, "maximum_sampling_rate": 44.1, "release_date_original": "2025-06-25", "release_date_download": "2025-06-25", "release_date_stream": "2025-06-25", "release_date_purchase": "2025-06-25", "purchasable": true, "streamable": true, "previewable": true, "sampleable": true, "downloadable": true, "displayable": true, "purchasable_at": 1750802400, "streamable_at": 1750802400, "hires": true, "hires_streamable": true }, { "maximum_bit_depth": 24, "copyright": "(C) 2025 Ringlets Under Exclusive License to Flying Nun Records (P) 2025 Ringlets Under Exclusive License to Flying Nun Records", "performers": "Olly Harmer, TrackingEngineer - Artist Control, MusicPublisher - Michael Logie, Producer - Ike Zwanikken, MasteringEngineer - Arlo Grey, Composer - Isaac Keating, MixingEngineer - Ringlets, Producer, MainArtist - Leith Towers, Composer - Arabella Poulsen, Composer - Laszlo Reynolds, Composer", "audio_info": { "replaygain_track_peak": 0.984467, "replaygain_track_gain": -9.72 }, "performer": { "name": "Ringlets", "id": 13632280 }, "album": { "image": { "small": "https://static.qobuz.com/images/covers/jc/dw/od1vjtcdjdwjc_230.jpg", "thumbnail": "https://static.qobuz.com/images/covers/jc/dw/od1vjtcdjdwjc_50.jpg", "large": "https://static.qobuz.com/images/covers/jc/dw/od1vjtcdjdwjc_600.jpg" }, "maximum_bit_depth": 24, "media_count": 1, "artist": { "image": null, "name": "Ringlets", "id": 13632280, "albums_count": 6, "slug": "ringlets", "picture": null }, "upc": "0784300479536", "released_at": 1750975200, "label": { "name": "Flying Nun Records", "id": 96109, "albums_count": 226, "supplier_id": 17, "slug": "flying-nun-records" }, "title": "The Lord Is My German Shepherd (Time for Walkies)", "qobuz_id": 319762898, "version": null, "duration": 2436, "parental_warning": false, "tracks_count": 10, "popularity": 0, "genre": { "path": [ 112, 119, 118 ], "color": "#5eabc1", "name": "Punk en New Wave", "id": 118, "slug": "punk-new-wave" }, "maximum_channel_count": 2, "id": "od1vjtcdjdwjc", "maximum_sampling_rate": 48, "previewable": true, "sampleable": true, "displayable": true, "streamable": true, "streamable_at": 1750975200, "downloadable": false, "purchasable_at": null, "purchasable": false, "release_date_original": "2025-06-27", "release_date_download": "2025-06-27", "release_date_stream": "2025-06-27", "release_date_purchase": "2025-06-27", "hires": true, "hires_streamable": true }, "work": null, "composer": { "name": "Leith Towers", "id": 13632281 }, "isrc": "NZFN02500129", "title": "Heavenly Wheel", "version": null, "duration": 219, "parental_warning": false, "track_number": 6, "maximum_channel_count": 2, "id": 319762904, "media_number": 1, "maximum_sampling_rate": 48, "release_date_original": "2025-06-27", "release_date_download": "2025-06-27", "release_date_stream": "2025-06-27", "release_date_purchase": "2025-06-27", "purchasable": true, "streamable": true, "previewable": true, "sampleable": true, "downloadable": true, "displayable": true, "purchasable_at": 1750975200, "streamable_at": 1750975200, "hires": true, "hires_streamable": true }, { "maximum_bit_depth": 24, "copyright": "(P) 2025 Mansionair Pty Ltd under exclusive licence to Sony Music Entertainment Australia Pty Ltd", "performers": "Matt Colton, Mastering Engineer - George Nicholas, Mixing Engineer - Mansionair, Producer, MainArtist, AssociatedPerformer - Lachlan Bostock, Composer, Lyricist, Keyboards, Recording Engineer, Bass - Jack Froggatt, Composer, Lyricist, Vocal - Alex Nicholls, Composer, Lyricist, Drums, Recording Engineer", "audio_info": { "replaygain_track_peak": 0.962524, "replaygain_track_gain": -9.81 }, "performer": { "name": "Mansionair", "id": 1952442 }, "album": { "image": { "small": "https://static.qobuz.com/images/covers/xa/2y/egaabxyjz2yxa_230.jpg", "thumbnail": "https://static.qobuz.com/images/covers/xa/2y/egaabxyjz2yxa_50.jpg", "large": "https://static.qobuz.com/images/covers/xa/2y/egaabxyjz2yxa_600.jpg" }, "maximum_bit_depth": 24, "media_count": 1, "artist": { "image": null, "name": "Mansionair", "id": 1952442, "albums_count": 105, "slug": "mansionair", "picture": null }, "upc": "0196873136899", "released_at": 1760047200, "label": { "name": "Sony Music Entertainment", "id": 4587, "albums_count": 39189, "supplier_id": 23, "slug": "sony-music-entertainment" }, "title": "Some Kind of Alchemy", "qobuz_id": 340851097, "version": null, "duration": 2287, "parental_warning": false, "tracks_count": 10, "popularity": 0, "genre": { "path": [ 64 ], "color": "#5eabc1", "name": "Electronic", "id": 64, "slug": "electro" }, "maximum_channel_count": 2, "id": "egaabxyjz2yxa", "maximum_sampling_rate": 44.1, "previewable": false, "sampleable": false, "displayable": true, "streamable": true, "streamable_at": 1750888800, "downloadable": false, "purchasable_at": null, "purchasable": false, "release_date_original": "2025-10-10", "release_date_download": "2025-10-10", "release_date_stream": "2025-10-10", "release_date_purchase": "2025-10-10", "hires": true, "hires_streamable": true }, "work": null, "composer": { "name": "Lachlan Bostock", "id": 2397785 }, "isrc": "AUBM02500083", "title": "ATLAS", "version": null, "duration": 415, "parental_warning": false, "track_number": 10, "maximum_channel_count": 2, "id": 340851107, "media_number": 1, "maximum_sampling_rate": 44.1, "release_date_original": "2025-10-10", "release_date_download": "2025-10-10", "release_date_stream": "2025-10-10", "release_date_purchase": "2025-10-10", "purchasable": true, "streamable": true, "previewable": false, "sampleable": false, "downloadable": true, "displayable": true, "purchasable_at": 1750888800, "streamable_at": 1750888800, "hires": true, "hires_streamable": true }, { "maximum_bit_depth": 24, "copyright": "2025 Therapy under exclusive license to Because Music Ltd. 2025 Therapy under exclusive license to Because Music Ltd.", "performers": "George Riley, FeaturedArtist - Logic1000, Composer, Producer, MainArtist - Big Ever, Composer, Producer", "audio_info": { "replaygain_track_peak": 1, "replaygain_track_gain": -8.03 }, "performer": { "name": "Logic1000", "id": 6090940 }, "album": { "image": { "small": "https://static.qobuz.com/images/covers/6b/ry/pjhiq3u36ry6b_230.jpg", "thumbnail": "https://static.qobuz.com/images/covers/6b/ry/pjhiq3u36ry6b_50.jpg", "large": "https://static.qobuz.com/images/covers/6b/ry/pjhiq3u36ry6b_600.jpg" }, "maximum_bit_depth": 24, "media_count": 1, "artist": { "image": null, "name": "Logic1000", "id": 6090940, "albums_count": 29, "slug": "logic1000", "picture": null }, "upc": "5056556161875", "released_at": 1750197600, "label": { "name": "therapy", "id": 1194943, "albums_count": 20, "supplier_id": 16, "slug": "therapy-2" }, "title": "i couldn't hold back (feat. George Riley)", "qobuz_id": 336756015, "version": null, "duration": 170, "parental_warning": false, "tracks_count": 1, "popularity": 0, "genre": { "path": [ 64 ], "color": "#5eabc1", "name": "Electronic", "id": 64, "slug": "electro" }, "maximum_channel_count": 2, "id": "pjhiq3u36ry6b", "maximum_sampling_rate": 48, "previewable": true, "sampleable": true, "displayable": true, "streamable": true, "streamable_at": 1750802400, "downloadable": false, "purchasable_at": null, "purchasable": false, "release_date_original": "2025-06-18", "release_date_download": "2025-06-18", "release_date_stream": "2025-06-18", "release_date_purchase": "2025-06-18", "hires": true, "hires_streamable": true }, "work": null, "composer": { "name": "Logic1000", "id": 6090940 }, "isrc": "GBMVH2500530", "title": "i couldn't hold back (feat. George Riley)", "version": null, "duration": 170, "parental_warning": false, "track_number": 1, "maximum_channel_count": 2, "id": 336756016, "media_number": 1, "maximum_sampling_rate": 48, "release_date_original": "2025-06-18", "release_date_download": "2025-06-18", "release_date_stream": "2025-06-18", "release_date_purchase": "2025-06-18", "purchasable": true, "streamable": true, "previewable": true, "sampleable": true, "downloadable": true, "displayable": true, "purchasable_at": 1750802400, "streamable_at": 1750802400, "hires": true, "hires_streamable": true }, { "maximum_bit_depth": 16, "copyright": "(C) 2025 Cut Copy Touring Pty Ltd (P) 2025 Cutters Records", "performers": "Dan Whitford, Composer, Producer - Cut Copy, MainArtist - Mitchell Scott, Composer - Heba Kadry, MasteringEngineer - BMG, MusicPublisher - Christoffer Berg, Mixer - Haima Marriot, Engineer", "audio_info": { "replaygain_track_peak": 0.975983, "replaygain_track_gain": -7.7 }, "performer": { "name": "Cut Copy", "id": 43365 }, "album": { "image": { "small": "https://static.qobuz.com/images/covers/yb/3s/lycz7dgoj3syb_230.jpg", "thumbnail": "https://static.qobuz.com/images/covers/yb/3s/lycz7dgoj3syb_50.jpg", "large": "https://static.qobuz.com/images/covers/yb/3s/lycz7dgoj3syb_600.jpg" }, "maximum_bit_depth": 16, "media_count": 1, "artist": { "image": null, "name": "Cut Copy", "id": 43365, "albums_count": 84, "slug": "cut-copy", "picture": null }, "upc": "0199350657603", "released_at": 1750716000, "label": { "name": "Cutters Records", "id": 21305, "albums_count": 41, "supplier_id": 17, "slug": "cutters-records" }, "title": "When This Is Over", "qobuz_id": 336247235, "version": null, "duration": 264, "parental_warning": false, "tracks_count": 1, "popularity": 0, "genre": { "path": [ 64, 129 ], "color": "#5eabc1", "name": "Dance", "id": 129, "slug": "dance" }, "maximum_channel_count": 2, "id": "lycz7dgoj3syb", "maximum_sampling_rate": 44.1, "previewable": true, "sampleable": true, "displayable": true, "streamable": true, "streamable_at": 1750716000, "downloadable": false, "purchasable_at": null, "purchasable": false, "release_date_original": "2025-06-24", "release_date_download": "2025-06-24", "release_date_stream": "2025-06-24", "release_date_purchase": "2025-06-24", "hires": false, "hires_streamable": false, "maximum_technical_specifications": "16 bits / 44.1 kHz - Stereo " }, "work": null, "composer": { "name": "Dan Whitford", "id": 642363 }, "isrc": "AUQJ32504201", "title": "When This Is Over", "version": null, "duration": 264, "parental_warning": false, "track_number": 1, "maximum_channel_count": 2, "id": 336247236, "media_number": 1, "maximum_sampling_rate": 44.1, "release_date_original": "2025-06-24", "release_date_download": "2025-06-24", "release_date_stream": "2025-06-24", "release_date_purchase": "2025-06-24", "purchasable": true, "streamable": true, "previewable": true, "sampleable": true, "downloadable": true, "displayable": true, "purchasable_at": 1750716000, "streamable_at": 1750716000, "hires": false, "hires_streamable": false, "maximum_technical_specifications": "16 bits / 44.1 kHz - Stereo " }, { "maximum_bit_depth": 24, "copyright": "2025 Jagjaguwar 2025 Jagjaguwar", "performers": "Ruban Nielson, Producer, Drums, Guitar, Vocals, Bass, ComposerLyricist - Unknown Mortal Orchestra, MainArtist - Third Side Music, MusicPublisher", "audio_info": { "replaygain_track_peak": 0.975281, "replaygain_track_gain": -7.59 }, "performer": { "name": "Unknown Mortal Orchestra", "id": 602783 }, "album": { "image": { "small": "https://static.qobuz.com/images/covers/ea/k0/z8bq7bpvck0ea_230.jpg", "thumbnail": "https://static.qobuz.com/images/covers/ea/k0/z8bq7bpvck0ea_50.jpg", "large": "https://static.qobuz.com/images/covers/ea/k0/z8bq7bpvck0ea_600.jpg" }, "maximum_bit_depth": 24, "media_count": 1, "artist": { "image": null, "name": "Unknown Mortal Orchestra", "id": 602783, "albums_count": 47, "slug": "unknown-mortal-orchestra", "picture": null }, "upc": "0656605248363", "released_at": 1750197600, "label": { "name": "Jagjaguwar", "id": 100011, "albums_count": 741, "supplier_id": 70, "slug": "jagjaguwar-1" }, "title": "CURSE", "qobuz_id": 332958848, "version": null, "duration": 756, "parental_warning": false, "tracks_count": 6, "popularity": 0, "genre": { "path": [ 112, 119, 113 ], "color": "#5eabc1", "name": "Alternative en Indie", "id": 113, "slug": "alternatif-et-inde" }, "maximum_channel_count": 2, "id": "z8bq7bpvck0ea", "maximum_sampling_rate": 96, "previewable": true, "sampleable": true, "displayable": true, "streamable": true, "streamable_at": 1748556000, "downloadable": false, "purchasable_at": null, "purchasable": false, "release_date_original": "2025-06-18", "release_date_download": "2025-06-18", "release_date_stream": "2025-06-18", "release_date_purchase": "2025-06-18", "hires": true, "hires_streamable": true }, "work": null, "composer": { "name": "Ruban Nielson", "id": 507253 }, "isrc": "US38Y2548302", "title": "BOYS WITH THE CHARACTERISTICS OF WOLVES", "version": null, "duration": 182, "parental_warning": false, "track_number": 2, "maximum_channel_count": 2, "id": 332958850, "media_number": 1, "maximum_sampling_rate": 96, "release_date_original": "2025-06-18", "release_date_download": "2025-06-18", "release_date_stream": "2025-06-18", "release_date_purchase": "2025-06-18", "purchasable": true, "streamable": true, "previewable": true, "sampleable": true, "downloadable": true, "displayable": true, "purchasable_at": 1748556000, "streamable_at": 1748556000, "hires": true, "hires_streamable": true }
      ]
    }
  }
};

function formatYear(timestamp: number) {
  const date = new Date(timestamp * 1000);
  return date.getFullYear();
}

function formatTime(time: number) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

export default function HomePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTracks, setFilteredTracks] = useState(mockData.data.tracks.items);
  const [displayedTracks, setDisplayedTracks] = useState(mockData.data.tracks.items);
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loadMoreCount, setLoadMoreCount] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [hasMoreResults, setHasMoreResults] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [streamUrl, setStreamUrl] = useState<string | null>(null);
  const router = useRouter();
  const { query } = router;

  useEffect(() => {
    if (typeof query.q === 'string') {
      setSearchTerm(query.q);
      handleSearch(0);
    }
    if (!searchTerm) {
      setFilteredTracks(mockData.data.tracks.items);
      setDisplayedTracks(mockData.data.tracks.items.slice(0, 5));
      setLoadMoreCount(5);
    } else {
      const filtered = mockData.data.tracks.items.filter((track) =>
        track.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.album.artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        track.album.genre.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTracks(filtered);
      setDisplayedTracks(filtered.slice(0, 5));
      setLoadMoreCount(5);
    }
  }, [searchTerm,query.q]);

  const handleSearch = async (offset = 0) => {
    if (!searchTerm.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await axios.get(`/api/get-music`, {
        params: {
          q: searchTerm,
          offset: offset
        },
        timeout: 10000,
      });
      
      const data = response.data;
      
      if (data.success && data.data && data.data.tracks) {
        const tracksRaw = data.data.tracks.items || [];
        const total = data.data.tracks.total || 0;
        const currentOffsetFromAPI = data.data.tracks.offset || 0;

        const tracks = tracksRaw.map((track: Album) => ({
          ...track,
          streamUrl: `/api/download-music?track_id=${encodeURIComponent(track.id)}&quality=5`,
        }));
        
        if (offset === 0) {
          setFilteredTracks(tracks);
          setDisplayedTracks(tracks);
        } else {
          setFilteredTracks(tracks);
          setDisplayedTracks(tracks);
        }
        
        setCurrentOffset(currentOffsetFromAPI);
        setTotalResults(total);
        setHasMoreResults((currentOffsetFromAPI * 10) < total);
      } else {
        setFilteredTracks([]);
        setDisplayedTracks([]);
        setHasMoreResults(false);
        setTotalResults(0);
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNABORTED') {
          setError('Request timeout - please try again');
        } else if (err.response) {
          setError(`Server error: ${err.response.status} - ${err.response.statusText}`);
        } else if (err.request) {
          setError('Network error - please check your connection');
        } else {
          setError(`Request error: ${err.message}`);
        }
      } else {
        setError(err instanceof Error ? err.message : 'An error occurred while searching');
      }
      setFilteredTracks([]);
      setDisplayedTracks([]);
      setHasMoreResults(false);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = async () => {
    const nextOffset = currentOffset + 1;
    await handleSearch(nextOffset);
  };

  const handlePlay = (trackId: string) => {
    const track = displayedTracks.find((a) => String(a.id) === trackId);
    if (track && track.streamUrl) {
      setStreamUrl(track.streamUrl);
      setPlayingTrack(trackId);
      setIsPlaying(true);
    }
  };

  const handleClosePlayer = () => {
    setPlayingTrack(null);
    setCurrentTime(0);
    setDuration(0);
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    const audio = document.getElementById("audio-player") as HTMLAudioElement;
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    setCurrentTime(e.currentTarget.currentTime);
  };

  const handleLoadedMetadata = (e: React.SyntheticEvent<HTMLAudioElement>) => {
    setDuration(e.currentTarget.duration);
  };

  return (
    <main className="container py-5">
      <header className="text-center mb-5 flex flex-col items-center space-y-4">
        <img src="/logo.svg" alt="Logo" width="200" height="200" className="w-16 h-16" />
        <h1 className="display-4 text-dark-custom hidden">Search songs and play them with ease.</h1>
        
      </header>

      <section className="mb-5">
        <div className="search-container position-relative">
          <input
            type="text"
            placeholder="Search by song, artist, genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control form-control-lg pe-5"
            aria-label="Search songs"
            onKeyPress={(e) => e.key === 'Enter' && handleSearch(0)}
            disabled={isLoading}
          />
          <div className="search-icon position-absolute" style={{ right: '10px', top: '50%', transform: 'translateY(-50%)', cursor: 'pointer' }} onClick={() => handleSearch(0)}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#98A1BC" className="bi bi-search" viewBox="0 0 16 16">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
            </svg>
          </div>
        </div>
      </section>

      {isLoading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-dark-custom" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-blue-custom">Searching for songs...</p>
        </div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">
          <strong>Error:</strong> {error}
        </div>
      ) : filteredTracks.length === 0 ? (
        <p className="text-center text-blue-custom fs-5">No results found.</p>
      ) : (
        <>
          {(hasMoreResults && (totalResults - ((currentOffset + 1) * 10)) > 0) && (
            <div className="text-center mb-2">
              <button
                onClick={handleLoadMore}
                className="btn btn-secondary px-4 py-2"
                disabled={isLoading}
              >
                {isLoading ? 'Loading...' : `Load More Results)`}
              </button>
            </div>
          )}


          <div className="d-flex flex-column gap-3 mb-4">
            {displayedTracks.map((track) => (
              <div key={track.id} className="song-item d-flex align-items-center p-3 rounded shadow-sm">
                <img
                  src={track.album.image.small}
                  alt={`${track.title} cover`}
                  className="rounded me-3"
                  style={{ width: "60px", height: "60px", objectFit: "cover" }}
                />
                <div className="flex-grow-1">
                  <div className="d-flex flex-column">
                    <h6 className="mb-1 text-dark-custom fw-bold">{track.album.artist.name}</h6>
                    <p className="mb-1 text-blue-custom">{track.title}</p>
                    <small className="text-muted">{track.album.genre.name} • {formatYear(track.album.released_at)}</small>
                  </div>
                </div>
                <button
                  onClick={() => handlePlay(String(track.id))}
                  className="btn btn-link text-dark-custom p-2"
                  aria-label={`Play ${track.title}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          
        </>
      )}

      {playingTrack && (
        <div
          className="fixed-bottom bg-dark-custom d-flex flex-column px-6 py-6 shadow-lg"
          style={{ height: "150px", zIndex: 1050, padding: "25px" }}
          role="region"
          aria-label="Audio player"
        >
          {/* Progress Bar */}
          <div className="mb-2">
            <div className="progress" style={{ height: "4px" }}>
              <div
                className="progress-bar progress-bar-custom"
                role="progressbar"
                style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                aria-valuenow={currentTime}
                aria-valuemin={0}
                aria-valuemax={duration}
              ></div>
            </div>
            <div className="d-flex justify-content-between text-white mt-1">
              <small>{formatTime(currentTime)}</small>
              <small>{formatTime(duration)}</small>
            </div>
          </div>

          {/* Player Controls */}
          <div className="d-flex align-items-center justify-content-between">
            {/* Album Cover and Info */}
            <div className="d-flex align-items-center gap-3">
              <img
                src={filteredTracks.find((a) => String(a.id) === playingTrack)?.album.image.small}
                alt="Album cover"
                style={{ width: "50px", height: "50px", objectFit: "cover", borderRadius: "6px" }}
              />
              <div className="text-white">
                <div className="fw-bold">{filteredTracks.find((a) => String(a.id) === playingTrack)?.title}</div>
                <div className="small">{filteredTracks.find((a) => String(a.id) === playingTrack)?.album.artist.name}</div>
              </div>
            </div>

            {/* Control Buttons - Only Play/Pause and Repeat */}
            <div className="d-flex align-items-center gap-3">
              <button
                type="button"
                className="btn btn-link text-white fs-5"
                aria-label="Play/Pause"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-pause-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z"/>
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" className="bi bi-play-circle-fill" viewBox="0 0 16 16">
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"/>
                  </svg>
                )}
              </button>
              <button type="button" className="btn btn-link text-white" aria-label="Repeat">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" className="bi bi-arrow-repeat" viewBox="0 0 16 16">
                  <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"/>
                  <path fillRule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 1 .832-.554A4 4 0 1 0 8 4v1z"/>
                </svg>
              </button>
            </div>

            {/* Volume and Close */}
            <div className="d-flex align-items-center gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-volume-up text-white" viewBox="0 0 16 16">
                <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"/>
                <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"/>
                <path d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4z"/>
              </svg>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                defaultValue="1"
                aria-label="Volume"
                style={{ width: "80px" }}
                onChange={(e) => {
                  const audio = document.getElementById("audio-player") as HTMLAudioElement;
                  audio.volume = parseFloat(e.currentTarget.value);
                }}
              />
              <button
                type="button"
                className="btn btn-link text-white"
                aria-label="Close player"
                onClick={handleClosePlayer}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-x-lg" viewBox="0 0 16 16">
                  <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
                </svg>
              </button>
            </div>

            <audio
              id="audio-player"
              src={streamUrl || undefined}
              autoPlay
              style={{ display: "none" }}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={handleLoadedMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </div>
        </div>
      )}
    </main>
  );
}
