import React from 'react';
import {AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {loadFont} from '@remotion/fonts';
import {Audio} from '@remotion/media';
import {BookStage} from './BookStage';
import {C,PaperDefs} from './PaperArt';
loadFont({family:'PaperSerif',url:staticFile('fonts/NotoSerifSC.ttf'),weight:'100 900'});
const captions=[
 [0,5.5,'一堂围棋课，是怎样磨出来的？'],
 [5.5,11,'先翻资料，把一句话的来处查清楚。'],
 [11,17.1,'再摆上棋盘，一步一步，认真验证。'],
 [17.1,24.3,'把难懂的棋理，写成能听懂的话。'],
 [24.3,32.5,'试讲一遍，再改一遍；孩子会卡在哪里，提前想一想。'],
 [32.5,38.2,'备课时的每一份用心，都为了课堂上那一声：我懂了。'],
] as const;
export const LemonCourse=()=>{
 const f=useCurrentFrame(); const {fps}=useVideoConfig(); const t=f/fps;
 const caption=captions.find(([a,b])=>t>=a&&t<b)?.[2]??'';
 const headline=t<5.5?'一堂好课，是怎样磨出来的':t<11?'先把来处，查清楚':t<17.1?'每一步，都亲手摆过':t<24.3?'每一句，都为孩子想过':t<32.5?'认真试讲，耐心修改':'一堂好课，始于一份用心';
 return <AbsoluteFill style={{background:'radial-gradient(ellipse at 48% 45%, #987344 0%, #694720 47%, #271c10 100%)',fontFamily:'PaperSerif',color:C.paper}}>
 <svg viewBox="0 0 1920 1080" width="1920" height="1080">
 <PaperDefs/>
 {/* Fine desk grain is deterministic and subtly catches the light. */}
 {Array.from({length:38},(_,i)=><path key={i} d={`M0 ${i*31}Q480 ${i*31-24} 960 ${i*31+7}T1920 ${i*31-6}`} stroke="#d5aa6c" strokeWidth={i%3===0?2:1} opacity=".065" fill="none"/>)}
 <text x="83" y="64" fill="#e6d2a9" fontSize="22" letterSpacing="6">柠檬说棋</text><text x="1837" y="64" textAnchor="end" fill="#dbc49c" fontSize="18" letterSpacing="4">备课手记 · 01</text>
 <text x="960" y="111" fontSize="44" fontWeight="700" textAnchor="middle" fill={C.light} opacity={interpolate(t,[0,.7],[0,1],{extrapolateRight:'clamp'})}>{headline}</text>
 <BookStage t={t}/>
 {/* The subtitle stays in a generous safe area and never covers the book. */}
 <g transform="translate(960 970)" filter="url(#shadow)"><path d="M-650-43 L-430-49-205-43 45-47 300-43 645-48 653 32 440 38 100 32-180 38-645 32Z" fill={C.light}/><text y="12" textAnchor="middle" fontSize="38" fontWeight="850" fill="#28382f">{caption}</text></g>
 <text x="960" y="1050" textAnchor="middle" fontSize="16" letterSpacing="5" fill="#d7bc8e">一笔一画 · 一子一步 · 柠檬说棋</text>
 </svg>
 <AbsoluteFill style={{pointerEvents:'none',opacity:.17,mixBlendMode:'multiply'}}><svg width="100%" height="100%"><rect width="100%" height="100%" filter="url(#grain)" fill="#b49a6b"/></svg></AbsoluteFill>
 <Sequence from={0} durationInFrames={Math.round(5.5*fps)} premountFor={fps} name="封面旁白"><Audio src={staticFile('audio/voice-0.wav')}/></Sequence>
 <Sequence from={Math.round(5.5*fps)} durationInFrames={Math.round(5.5*fps)} premountFor={fps} name="查资料旁白"><Audio src={staticFile('audio/voice-1.wav')}/></Sequence>
 <Sequence from={11*fps} durationInFrames={Math.round(6.1*fps)} premountFor={fps} name="摆棋旁白"><Audio src={staticFile('audio/voice-2.wav')}/></Sequence>
 <Sequence from={Math.round(17.1*fps)} durationInFrames={Math.round(7.2*fps)} premountFor={fps} name="写教案旁白"><Audio src={staticFile('audio/voice-3.wav')}/></Sequence>
 <Sequence from={Math.round(24.3*fps)} durationInFrames={Math.round(8.2*fps)} premountFor={fps} name="试讲旁白"><Audio src={staticFile('audio/voice-4.wav')}/></Sequence>
 <Sequence from={Math.round(32.5*fps)} durationInFrames={Math.round(5.7*fps)} premountFor={fps} name="课堂旁白"><Audio src={staticFile('audio/voice-5.wav')}/></Sequence>
 <Audio src={staticFile('audio/score.wav')} volume={.23}/>
 </AbsoluteFill>;
};
