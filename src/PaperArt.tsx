import React from 'react';
import {BOARD_SIZE,coordinate,GRID,stars,stones} from './board';

export const C={paper:'#f3e6c8',ink:'#263e35',red:'#ae4d36',gold:'#d9ae50',green:'#486d59',light:'#fff6dc'};
export const PaperDefs=()=> <defs>
  <filter id="shadow" x="-50%" y="-50%" width="210%" height="230%"><feDropShadow dx="8" dy="16" stdDeviation="7" floodColor="#1f1409" floodOpacity=".32"/></filter>
  <filter id="grain"><feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="3" seed="12"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncA type="linear" slope=".13"/></feComponentTransfer><feBlend in="SourceGraphic" mode="multiply"/></filter>
  <linearGradient id="sheet" x1="0" x2="1"><stop stopColor="#d6c6a4"/><stop offset=".18" stopColor={C.paper}/><stop offset=".8" stopColor="#f9edcf"/><stop offset="1" stopColor="#ddcca9"/></linearGradient>
  <linearGradient id="sky" x2="0" y2="1"><stop stopColor="#1b534b"/><stop offset="1" stopColor="#769179"/></linearGradient>
  <radialGradient id="blackStone" cx=".3" cy=".25"><stop stopColor="#50534c"/><stop offset=".65" stopColor="#202923"/><stop offset="1" stopColor="#121b16"/></radialGradient>
  <radialGradient id="whiteStone" cx=".3" cy=".25"><stop stopColor="#fffdf2"/><stop offset=".7" stopColor="#eee7d5"/><stop offset="1" stopColor="#bdb8a6"/></radialGradient>
</defs>;

export const Label=({x,y,text,color=C.green,angle=0,width=215}:{x:number;y:number;text:string;color?:string;angle?:number;width?:number})=><g transform={`translate(${x} ${y}) rotate(${angle})`} filter="url(#shadow)">
 <path d={`M0 0 L${width} 3 L${width-3} 64 L4 68 Z`} fill={C.light}/><path d={`M0 0L${width} 3`} stroke={color} strokeWidth="5"/>
 <text x={width/2} y="44" textAnchor="middle" fill={color} fontSize="29" fontWeight="800">{text}</text>
</g>;

export const Person=({x,y,scale=1,student=false,arm=0}:{x:number;y:number;scale?:number;student?:boolean;arm?:number})=><g transform={`translate(${x} ${y}) scale(${scale})`}>
 <ellipse cx="0" cy="5" rx="55" ry="10" fill="#352916" opacity=".18"/>
 <g filter="url(#shadow)" stroke={C.paper} strokeWidth="7" strokeLinejoin="round">
 <path d="M-26-62 L-24-7 -43-4 -43 4 -7 4 0-62 M8-62 15-6 38-2 38 5 2 5 -10-62" fill="#334a40"/>
 <path d="M-32-153 Q0-173 31-153 L45-67 -43-67Z" fill={student?C.gold:C.green}/>
 <path d="M-21-169 L-18-151 Q0-139 16-153 L17-175" fill="#d9a67c"/>
 <path d="M-40-214 Q-39-258 0-254 Q40-254 39-207 L29-166 Q-1-151-30-171Z" fill="#e3b88a"/>
 <path d="M-41-208 Q-49-254-12-266 Q32-281 44-236 L36-206 26-237 Q-12-218-34-234L-32-205Z" fill="#24352e"/>
 <path d="M-31-149 L-65-96 -46-84 -14-125" fill={student?C.gold:C.green}/>
 <g transform={`rotate(${arm} 28 -143)`}><path d="M25-146 L65-117 84-152 97-145 77-91Q72-81 60-86L22-108Z" fill={student?C.gold:C.green}/><path d="M84-152L89-171Q96-182 99-169L97-145Z" fill="#e3b88a"/></g>
 </g>
 <g fill={C.ink}><circle cx="-13" cy="-207" r="3"/><circle cx="13" cy="-207" r="3"/></g>
 {!student&&<g fill="none" stroke={C.ink} strokeWidth="2.5"><rect x="-27" y="-218" width="23" height="18" rx="6"/><rect x="5" y="-218" width="23" height="18" rx="6"/><path d="M-4-210H5"/></g>}
 <path d="M-8-184Q0-179 9-185" fill="none" stroke="#944c38" strokeWidth="2.5"/>
 <path d="M-13-143L0-131 13-143" fill="none" stroke={C.paper} strokeWidth="4"/>
</g>;

export const Board=({count=12}:{count?:number})=><g>
 <rect width={BOARD_SIZE} height={BOARD_SIZE} rx="3" fill="#dbc08a" stroke="#9e8051" strokeWidth="4"/>
 {Array.from({length:GRID},(_,i)=><g key={i} stroke="#695d3d" strokeWidth=".9"><line x1={coordinate(i)} x2={coordinate(i)} y1={coordinate(0)} y2={coordinate(18)}/><line y1={coordinate(i)} y2={coordinate(i)} x1={coordinate(0)} x2={coordinate(18)}/></g>)}
 {stars.map(([x,y])=><circle key={`${x}-${y}`} cx={coordinate(x)} cy={coordinate(y)} r="2.2" fill="#554f34"/>)}
 {stones.slice(0,count).map((s,i)=><g key={i}><ellipse cx={coordinate(s.x)+1.5} cy={coordinate(s.y)+2.3} rx="7.6" ry="7" fill="#41371e" opacity=".3"/><circle cx={coordinate(s.x)} cy={coordinate(s.y)} r="6.8" fill={`url(#${s.color}Stone)`} stroke={s.color==='black'?'#172019':'#b7b09b'} strokeWidth=".8"/></g>)}
</g>;

export const Pencil=({x,y,angle=-35}:{x:number;y:number;angle?:number})=><g transform={`translate(${x} ${y}) rotate(${angle})`} filter="url(#shadow)"><path d="M0 0 L-8-27V-174H8V-27Z" fill={C.gold}/><path d="M-8-27L0 0 8-27" fill="#dfbe90"/><path d="M-3-9L0 0 3-9" fill={C.ink}/><path d="M-6-172V-31" stroke="#fff0ad" strokeWidth="3"/><rect x="-8" y="-184" width="16" height="15" fill={C.red}/></g>;

export const Hand=({x,y,angle=0}:{x:number;y:number;angle?:number})=><g transform={`translate(${x} ${y}) rotate(${angle})`} filter="url(#shadow)" stroke={C.paper} strokeWidth="5" strokeLinejoin="round">
 <path d="M180 190 L66 114Q26 100 12 63 L-10 29Q-16 14-3 11L27 36 5-20Q4-36 16-31L53 24 43-24Q45-39 57-29L84 26 88-8Q94-22 103-6L119 48Q136 74 153 101L223 143Z" fill="#d7aa7b"/>
 <path d="M166 104L235 138 202 203 143 160Z" fill={C.green}/>
</g>;

export const Notebook=({progress=1}:{progress?:number})=><g filter="url(#shadow)">
 <path d="M0 0L290-8 299 258 4 268Z" fill={C.paper} stroke="#cabb98" strokeWidth="2"/>
 {Array.from({length:8},(_,i)=><g key={i}><circle cx="13" cy={20+i*30} r="4" fill="#9f9070"/><path d={`M12 ${20+i*30}q-26-12-19 5`} fill="none" stroke="#ac8d51" strokeWidth="3"/></g>)}
 <text x="43" y="40" fill={C.ink} fontSize="25" fontWeight="800">今天，讲清一件事</text>
 {['先观察，再落子','为什么这样下？','让孩子自己说出来'].map((s,i)=><g key={s} opacity={Math.min(1,Math.max(0,progress*4-i))}><path d={`M42 ${100+i*53}H265`} stroke="#cebd9b" strokeWidth="1"/><text x="43" y={91+i*53} fontSize="22" fill={C.ink}>{s}</text></g>)}
 <path d="M44 211Q136 200 247 208" fill="none" stroke={C.red} strokeWidth="3" strokeDasharray="215" strokeDashoffset={215*(1-progress)}/>
</g>;
