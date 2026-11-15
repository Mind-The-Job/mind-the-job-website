import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

async function send(payload) {
    const res = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    });
    if (!res.ok) throw new Error((await res.json().catch(() => ({}))).error || 'Could not save');
}

export const Feedback = () => {
    const [params] = useSearchParams();
    const ref = UUID.test(params.get('ref') || '') ? params.get('ref') : undefined;
    const first = Number(params.get('score'));
    const [rating, setRating] = useState(first >= 1 && first <= 5 ? first : null);
    const [recommend, setRecommend] = useState(null);
    const [comment, setComment] = useState('');
    const [state, setState] = useState('idle'); // idle | saving | saved | done | error
    const [error, setError] = useState('');
    const autoSaved = useRef(false);

    // A score clicked in the email is saved straight away.
    useEffect(() => {
        if (autoSaved.current || !rating || !ref) return;
        autoSaved.current = true;
        send({ ref, rating, source: 'email' }).then(() => setState('saved')).catch(() => {});
    }, [rating, ref]);

    const submit = async (e) => {
        e.preventDefault();
        if (!rating && recommend === null && !comment.trim()) {
            setError('Please choose a score.');
            return;
        }
        setState('saving');
        setError('');
        try {
            await send({ ref, rating: rating ?? undefined, recommend: recommend ?? undefined, comment, source: ref ? 'email' : 'website' });
            setState('done');
        } catch (err) {
            setError(err.message);
            setState('error');
        }
    };

    return (
        <div className="bg-surface-muted pt-36 pb-20 min-h-screen">
            <div className="container mx-auto px-4 md:px-6 max-w-2xl">
                <section className="bg-white border border-slate-200 rounded-3xl p-7 space-y-6">
                    {state === 'done' ? (
                        <div role="status" className="space-y-2">
                            <h1 className="text-3xl font-bold text-primary">Thank you</h1>
                            <p className="text-text-muted">Your feedback goes straight to our CEO and helps us improve the service.</p>
                        </div>
                    ) : (
                        <form onSubmit={submit} className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-primary">How are we doing?</h1>
                                <p className="text-text-muted mt-1">Two quick questions. It takes 20 seconds.</p>
                                {state === 'saved' && <p role="status" className="mt-3 rounded-lg bg-emerald-50 border border-emerald-200 p-3 text-emerald-900 font-semibold">Your score of {rating} has been saved. Add a comment below if you like.</p>}
                            </div>

                            <fieldset>
                                <legend className="font-semibold mb-2">How happy are you with us so far? (5 is best)</legend>
                                <div className="flex flex-wrap gap-2">
                                    {[1, 2, 3, 4, 5].map((n) => (
                                        <button key={n} type="button" aria-pressed={rating === n} onClick={() => setRating(n)}
                                            className={`min-h-[44px] min-w-[52px] rounded-lg border font-bold ${rating === n ? 'bg-primary text-white border-primary' : 'border-slate-300'}`}>
                                            {n} ★
                                        </button>
                                    ))}
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="font-semibold mb-2">How likely are you to recommend us to another agency? (0 to 10)</legend>
                                <div className="flex flex-wrap gap-1.5">
                                    {Array.from({ length: 11 }, (_, n) => (
                                        <button key={n} type="button" aria-pressed={recommend === n} onClick={() => setRecommend(n)}
                                            className={`min-h-[44px] min-w-[44px] rounded-lg border font-semibold ${recommend === n ? 'bg-primary text-white border-primary' : 'border-slate-300'}`}>
                                            {n}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>

                            <div>
                                <label htmlFor="fb-comment" className="block font-semibold mb-1">Anything we could do better? (optional)</label>
                                <textarea id="fb-comment" rows={4} maxLength={1500} value={comment} onChange={(e) => setComment(e.target.value)}
                                    className="w-full rounded-lg border border-slate-300 p-3" />
                                <p className="text-xs text-text-muted mt-1">Please don't include any worker's personal details.</p>
                            </div>

                            {error && <p role="alert" className="text-red-700 font-semibold">{error}</p>}
                            <button type="submit" disabled={state === 'saving'} className="min-h-[48px] px-6 rounded-xl bg-amber-400 text-primary font-bold hover:bg-amber-300 disabled:opacity-60">
                                {state === 'saving' ? 'Sending…' : 'Send feedback'}
                            </button>
                        </form>
                    )}
                </section>
            </div>
        </div>
    );
};
