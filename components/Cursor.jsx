'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const dot  = useRef(null);
  const ring = useRef(null);
  const txt  = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mx = 0, my = 0, rx = 0, ry = 0;

    const move = (e) => {
      mx = e.clientX; my = e.clientY;
      dot.current.style.left  = mx + 'px';
      dot.current.style.top   = my + 'px';
      txt.current.style.left  = mx + 'px';
      txt.current.style.top   = my + 'px';
    };

    const lerp = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.current.style.left = rx + 'px';
      ring.current.style.top  = ry + 'px';
      requestAnimationFrame(lerp);
    };
    lerp();

    document.addEventListener('mousemove', move);

    const hoverEls = () => document.querySelectorAll('a,button,[data-tilt]');
    const enter = () => document.body.classList.add('cursor-hover');
    const leave = () => document.body.classList.remove('cursor-hover');
    const imgEnter = () => { document.body.classList.add('cursor-img'); txt.current.textContent = 'ver +'; };
    const imgLeave = () => document.body.classList.remove('cursor-img');

    const attachHover = () => {
      hoverEls().forEach(el => { el.addEventListener('mouseenter', enter); el.addEventListener('mouseleave', leave); });
      document.querySelectorAll('.hero-img,.sobre-img').forEach(img => {
        img.addEventListener('mouseenter', imgEnter);
        img.addEventListener('mouseleave', imgLeave);
      });
    };
    attachHover();

    return () => document.removeEventListener('mousemove', move);
  }, []);

  return (
    <>
      <style>{`
        #cur-dot { width:8px;height:8px;background:#4A5C35;border-radius:50%;position:fixed;top:0;left:0;transform:translate(-50%,-50%);pointer-events:none;z-index:9999;transition:width .2s,height .2s,background .2s; }
        #cur-ring { width:36px;height:36px;border:1.5px solid #4A5C35;border-radius:50%;position:fixed;top:0;left:0;transform:translate(-50%,-50%);pointer-events:none;z-index:9998;opacity:.6;transition:width .35s cubic-bezier(0.16,1,0.3,1),height .35s cubic-bezier(0.16,1,0.3,1),opacity .2s; }
        #cur-txt { position:fixed;top:0;left:0;transform:translate(-50%,-50%);pointer-events:none;z-index:9997;font-size:10px;font-weight:500;letter-spacing:.05em;color:#fff;opacity:0;transition:opacity .2s;white-space:nowrap; }
        body.cursor-hover #cur-ring { width:60px;height:60px;opacity:1; }
        body.cursor-img #cur-dot    { width:56px;height:56px;opacity:.85; }
        body.cursor-img #cur-ring   { opacity:0; }
        body.cursor-img #cur-txt    { opacity:1; }
      `}</style>
      <div ref={dot}  id="cur-dot"  />
      <div ref={ring} id="cur-ring" />
      <div ref={txt}  id="cur-txt"  />
    </>
  );
}
