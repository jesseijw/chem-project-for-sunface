"use client";
import { useEffect,useState } from "react";
import { Atom,ChevronRight,FlaskConical,LockKeyhole,ShieldCheck,UserRound } from "lucide-react";
import Coach from "./coach";

type Role="student"|"admin"|"guest";
type Progress={completed:number;sessions:number;flashcards:number;lastActive:string;focus:string};
const progressKey="chem-coach-sunface-progress";
const initialProgress:Progress={completed:3,sessions:4,flashcards:12,lastActive:"Today",focus:"Mole ratios"};

function AdminConsole({logout}:{logout:()=>void}){
 const [progress]=useState<Progress>(()=>{if(typeof window==="undefined")return initialProgress;const saved=localStorage.getItem(progressKey);return saved?JSON.parse(saved) as Progress:initialProgress});
 return <div className="admin-shell"><aside className="admin-side"><div className="brand"><span className="brandmark"><Atom size={22}/></span><span>Chem Coach</span></div><div className="admin-badge"><ShieldCheck/>Admin console</div><button className="admin-logout" onClick={logout}>Sign out</button></aside><main className="admin-main"><header><div><span className="eyebrow">LEARNER OVERVIEW</span><h1>Sunface Fat Butt&apos;s progress</h1></div><span className="streak">Updated {progress.lastActive}</span></header><section className="admin-grid"><article><span>Completed</span><strong>{progress.completed}</strong><small>learning activities</small></article><article><span>Study sessions</span><strong>{progress.sessions}</strong><small>total sessions</small></article><article><span>Flashcards</span><strong>{progress.flashcards}</strong><small>reviewed cards</small></article></section><section className="admin-detail"><div><span className="eyebrow">CURRENT FOCUS</span><h2>{progress.focus}</h2><p>The learner is ready to verify this topic independently. More attempts will appear here as Sunface works through Chem Coach.</p></div><div className="admin-status"><i/><div><strong>Active learner</strong><span>Last activity: {progress.lastActive}</span></div></div></section></main></div>
}

export default function LoginApp(){
 const [role,setRole]=useState<Role|null>(null);const [loading,setLoading]=useState(true);const [account,setAccount]=useState<"student"|"admin">("student");const [password,setPassword]=useState("");const [error,setError]=useState("");const [submitting,setSubmitting]=useState(false);
 useEffect(()=>{fetch("/api/local-login").then(r=>r.json()).then((data:{role:Role|null})=>setRole(data.role)).finally(()=>setLoading(false))},[]);
 const login=async(next:Role)=>{setSubmitting(true);setError("");const response=await fetch("/api/local-login",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({account:next,password})});const data=await response.json() as {role?:Role;error?:string};if(!response.ok){setError(data.error||"Could not sign in.");setSubmitting(false);return}if(next==="student"){const saved=localStorage.getItem(progressKey);const progress=saved?JSON.parse(saved) as Progress:initialProgress;progress.sessions+=1;progress.lastActive="Today";localStorage.setItem(progressKey,JSON.stringify(progress))}setRole(data.role||next);setSubmitting(false)};
 const logout=async()=>{await fetch("/api/local-login",{method:"DELETE"});setRole(null);setPassword("");setError("")};
 if(loading)return <div className="login-loading"><Atom/></div>;
 if(role==="admin")return <AdminConsole logout={logout}/>;
 if(role==="student"||role==="guest")return <Coach name={role==="student"?"Sunface Fat Butt":"Guest Test"} onSignOut={logout}/>;
 return <main className="login-page"><section className="login-card"><div className="login-mark"><FlaskConical/></div><span className="eyebrow">CHEM COACH</span><h1>Welcome back</h1><p>Choose your account to continue learning.</p><label className="field-label">Account<select value={account} onChange={e=>{setAccount(e.target.value as "student"|"admin");setError("")}}><option value="student">Sunface Fat Butt</option><option value="admin">Admin</option></select></label>{account==="admin"&&<label className="field-label">Admin password<div className="password-field"><LockKeyhole/><input type="password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>{if(e.key==="Enter")void login("admin")}} placeholder="Enter password" autoFocus/></div></label>}{error&&<div className="login-error">{error}</div>}<button className="primary login-submit" disabled={submitting||(account==="admin"&&!password)} onClick={()=>login(account)}>{submitting?"Signing in…":"Continue"}<ChevronRight/></button><div className="login-divider"><span>or</span></div><button className="guest-button" disabled={submitting} onClick={()=>login("guest")}><UserRound/><div><strong>Guest Test</strong><span>Try the app without changing Sunface&apos;s progress</span></div><ChevronRight/></button></section></main>
}
