"""Reproducible original pentatonic score and paper/stone foley. Python stdlib only."""
from pathlib import Path
import math, random, wave, array
RATE=48000; DURATION=38.2
samples=array.array('f',[0]) * int(RATE*DURATION)
rng=random.Random(42)
def pluck(start,freq,duration=2.5,gain=.15):
    begin=int(start*RATE)
    for i in range(min(int(duration*RATE),len(samples)-begin)):
        t=i/RATE
        env=(1-math.exp(-t*110))*math.exp(-t*2.6)
        tone=math.sin(2*math.pi*freq*t)+.28*math.sin(2*math.pi*freq*2*t)*math.exp(-t*2)+.09*math.sin(2*math.pi*freq*3*t)
        samples[begin+i]+=gain*env*tone
notes=[261.63,329.63,392,440,523.25,440,392,329.63]
for beat in range(50):
    start=.4+beat*.75
    pluck(start,notes[(beat//8+beat)%len(notes)],gain=.13 if beat%4 else .18)
    if beat%4==0:pluck(start,130.81 if (beat//8)%2==0 else 110,duration=3,gain=.12)
for start in [2.4,5.7,11,17.1,24.3,32.5]:
    last=0.
    for i in range(int(.55*RATE)):
        t=i/RATE;last=.76*last+.24*rng.uniform(-1,1)
        at=int(start*RATE)+i
        if at<len(samples):samples[at]+=.1*last*math.sin(math.pi*t/.55)**2
for j in range(12):
    start=11.5+j/3;begin=int(start*RATE)
    for i in range(int(.1*RATE)):
        t=i/RATE;samples[begin+i]+=.13*math.exp(-t*75)*(math.sin(2*math.pi*900*t)+.4*rng.uniform(-1,1))
output=array.array('h')
for i,s in enumerate(samples):
    t=i/RATE;fade=min(1,t/1.5,(DURATION-t)/2)
    output.append(round(max(-1,min(1,s*fade))*32767))
dest=Path(__file__).resolve().parents[1]/'public/audio/score.wav';dest.parent.mkdir(exist_ok=True,parents=True)
with wave.open(str(dest),'wb') as w:w.setnchannels(1);w.setsampwidth(2);w.setframerate(RATE);w.writeframes(output.tobytes())
print('Original score:',dest.name)
