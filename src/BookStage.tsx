import React from 'react';
import {interpolate,Easing} from 'remotion';
import {C,Board,Hand,Label,Notebook,Pencil,Person} from './PaperArt';
import {researchHeadings} from './research-layout';
const clamp={extrapolateLeft:'clamp',extrapolateRight:'clamp'} as const;
const rise=(t:number,start:number,d=.8)=>interpolate(t,[start,start+d],[0,1],{...clamp,easing:Easing.bezier(.16,1,.3,1)});
const Pop=({x,y,p,children}:{x:number;y:number;p:number;children:React.ReactNode})=><g transform={`translate(${x} ${y}) scale(1 ${Math.max(.001,p)})`} opacity={Math.min(1,p*4)}>{children}</g>;

export const BookStage=({t}:{t:number})=>{
 const open=rise(t,2.3,2.1); const research=rise(t,5.7); const board=rise(t,11); const notes=rise(t,17.1); const teaching=rise(t,24.3); const finish=rise(t,32.5);
 const zoom=interpolate(t,[0,2,5,10,16,23,29,33,38.2],[.83,.86,1,1.02,1.06,1.04,1.02,.94,.94],clamp);
 return <g transform={`translate(960 565) scale(${zoom*.91}) translate(-960 -530)`}>
 {/* Warm paper scraps placed by hand, never generated board imagery. */}
 {[0,1,2,3,4,5].map(i=><g key={i} opacity={finish} transform={`translate(${i<3?210+i*55:1530+(i-3)*45} ${650+(i%3)*65}) rotate(${(i%2?1:-1)*(12+i*4)})`} filter="url(#shadow)"><rect width="155" height="110" fill={C.paper}/>{[0,1,2,3].map(j=><path key={j} d={`M17 ${22+j*18}H135`} stroke="#b8a886" strokeWidth="2"/>)}</g>)}
 <ellipse cx="990" cy="844" rx="720" ry="70" fill="#130e06" opacity=".30"/>
 <g opacity={open}>
 <path d="M430 500L1490 500 1680 843 244 843Z" fill="#102f2b" stroke="#0b2725" strokeWidth="10"/>
 {[0,1,2,3].map(i=><path key={i} d={`M432 ${499-i*3}L1488 ${499-i*3} 1662 ${832-i*4} 260 ${832-i*4}Z`} fill="#e6d7b4" stroke="#b4a078" strokeWidth="1.5"/>)}
 <path d="M442 502L1478 502 1642 810Q970 841 279 810Z" fill="url(#sheet)"/>
 <path d="M963 508L960 821" stroke="#ad9774" strokeWidth="3" opacity=".6"/>
 </g>
 {/* Back board hinges up from the book crease. */}
 <Pop x={0} y={510} p={open}>
  <path d="M432 0L1488 0 1507-387 414-387Z" fill="#163e35" stroke="#102e28" strokeWidth="12" filter="url(#shadow)"/>
  <path d="M447-13L1473-13 1487-368 435-368Z" fill="url(#sky)"/>
  <circle cx="1248" cy="-264" r="74" fill="#ead8a0"/>
  <path d="M437-108L577-228 666-154 790-247 945-109 1068-198 1200-101 1341-206 1480-114V-10H438Z" fill="#91a080"/>
  <path d="M439-65L632-157 770-70 947-158 1129-56 1272-137 1476-80V0H439Z" fill="#496d57"/>
  <path d="M440-19Q620-95 795-41T1125-30 1475-24V8H440Z" fill="#254d40"/>
  <text x="510" y="-278" fill={C.paper} fontSize="37" letterSpacing="9">柠檬说棋</text>
  <text x="505" y="-206" fill={C.light} fontSize="57" fontWeight="900">把每一课，放在心上。</text>
  <path d="M510-174H1010" stroke={C.gold} strokeWidth="3"/>
  <text x="510" y="-138" fill="#e4d3a6" fontSize="19" letterSpacing="5">备课手记 · 从书桌到课堂</text>
  {/* tiny paper pavilion */}<g transform="translate(1290 -90)"><path d="M-70 0L0-48 70 0Z" fill={C.red}/><path d="M-59 0H59M-45 0V63M45 0V63M-60 63H60" stroke={C.paper} strokeWidth="9"/><path d="M-65 70H65" stroke={C.gold} strokeWidth="7"/></g>
 </Pop>
 {/* Closed cloth cover, opens toward the back before disappearing. */}
 {open<.995&&<g opacity={1-rise(t,3.5,.8)} transform={`translate(960 520) scale(1 ${1-open*.85}) rotate(-3) translate(-960 -520)`} filter="url(#shadow)">
  <rect x="534" y="227" width="852" height="582" rx="4" fill="#234b40" stroke="#132e28" strokeWidth="16"/>
  <rect x="564" y="255" width="792" height="522" fill="none" stroke={C.gold} strokeWidth="2"/>
  <rect x="580" y="272" width="760" height="488" fill="none" stroke={C.gold} strokeWidth="1"/>
  <path d="M960 309c28-33 67-24 77 7-26 33-61 36-77-7Z" fill={C.gold}/>
  <text x="960" y="423" textAnchor="middle" fontSize="40" fill={C.paper} letterSpacing="12">柠檬说棋 · 备课手记</text>
  <text x="960" y="533" textAnchor="middle" fontSize="79" fontWeight="900" fill={C.light}>一堂好课</text>
  <text x="960" y="613" textAnchor="middle" fontSize="48" fill={C.paper}>是怎样磨出来的</text>
  <path d="M780 665H1140" stroke={C.gold} strokeWidth="2"/>
  <text x="960" y="711" textAnchor="middle" fontSize="21" letterSpacing="7" fill={C.gold}>一笔一画 · 一子一步</text>
 </g>}
 {/* Research fold-out */}
 <Pop x={485} y={702} p={research}>
  <g transform="rotate(-5)" filter="url(#shadow)"><path d="M-28 0L-16-225 116-242 126-3Z" fill="#d5c29b"/><path d="M-14-231L126-215 274-239 278 7 126 24-14 0Z" fill={C.paper}/><path d="M126-215V24" stroke="#bba680" strokeWidth="3"/>
  {researchHeadings.map(h=><text key={h.text} x={h.x} y={h.y} fontSize={h.fontSize} fill={h.page==='left'?C.ink:C.red}>{h.text}</text>)}
  {[0,1,2,3,4].map(i=><g key={i} stroke="#b0a080" strokeWidth="2"><path d={`M6 ${-118+i*23}L105 ${-107+i*23}`}/><path d={`M147 ${-112+i*23}L257 ${-130+i*23}`}/></g>)}
  <path d="M28-63L108-54" stroke={C.red} strokeWidth="3"/><path d="M173-37Q208-58 247-53" stroke={C.red} fill="none" strokeWidth="3"/></g>
  <Label x={-43} y={36} text="① 翻资料" angle={-6} width={250}/>
 </Pop>
 {/* Upright coordinate-based demonstration board, on a paper easel. */}
 <Pop x={824} y={701} p={board}>
  <path d="M65-30L33 45M245-30L276 45" stroke="#a58759" strokeWidth="15"/>
  <g transform="translate(0 -305) rotate(2 157 157)" filter="url(#shadow)"><rect x="-12" y="-12" width="338" height="338" fill={C.paper}/><Board count={Math.min(12,Math.max(0,Math.floor((t-11.5)*3)))}/></g>
  <Label x={26} y={42} text="② 摆棋验证" color={C.red} angle={2} width={250}/>
  <text x="160" y="29" textAnchor="middle" fontSize="15" fill={C.ink}>十九路棋盘 · 示意局面</text>
 </Pop>
 <Pop x={1205} y={689} p={notes}>
  <g transform="translate(0 -251) rotate(5)"><Notebook progress={rise(t,18.2,4)}/></g>
  <Label x={-2} y={62} text="③ 写成教案" color="#9c7939" angle={6} width={253}/>
 </Pop>
 {/* A hand writes and revises: deliberately present the person behind the lesson. */}
 {t>18&&t<24.7&&<g opacity={Math.min(rise(t,18,.5),1-rise(t,24,.6))} transform={`translate(${Math.sin(t*4)*12} ${Math.cos(t*3)*5})`}><Pencil x={1380+Math.min(100,(t-18)*18)} y={590} angle={27}/><Hand x={1404+Math.min(100,(t-18)*18)} y={538} angle={18}/></g>}
 <Pop x={393} y={780} p={research}><Person x={0} y={0} scale={1.05} arm={-10+Math.sin(t*2)*7}/></Pop>
 <Pop x={1570} y={792} p={teaching}><Person x={0} y={0} scale={.79} student arm={-20+Math.sin(t*2)*9}/></Pop>
 <g opacity={teaching} transform={`translate(560 372) rotate(-7)`} filter="url(#shadow)"><path d="M0 0L247 0 248 70 37 70 11 93 17 70 0 70Z" fill={C.light}/><text x="124" y="47" fontSize="30" textAnchor="middle" fill={C.red}>{t<29?'再试讲一遍':'这里，再讲慢一点'}</text></g>
 <g opacity={finish} transform="translate(1450 460) rotate(8)" filter="url(#shadow)"><path d="M0 0H215V79H81L58 102 58 79H0Z" fill={C.gold}/><text x="107" y="54" textAnchor="middle" fontSize="39" fontWeight="900" fill={C.ink}>我懂了！</text></g>
 {/* Book tabs and hand-drawn corrections */}
 <g opacity={teaching}><path d="M1155 630l10 12 22-29M1146 682l10 12 22-29" stroke={C.red} strokeWidth="5" fill="none"/><Pencil x={720} y={804} angle={75}/></g>
 <g opacity={open}><path d="M590 821v40l22-15 22 15v-40" fill={C.red}/><path d="M1390 821v36l20-12 20 12v-36" fill={C.gold}/></g>
 </g>;
};
