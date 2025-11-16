# Memory Keeper: AI-Powered Innovations
## Конкурентное преимущество через LLM, embeddings, sentiment analysis и vision AI

**Версия:** 1.0 AI Innovation Strategy  
**Дата:** 13 ноября 2025  
**Язык:** Русский + код на английском  
**Фокус:** Бесплатные и низкобюджетные AI инструменты для максимизации ценности без увеличения затрат

---

## EXECUTIVE SUMMARY: Почему AI для Memory Keeper?

Memory Keeper может стать **невероятно более ценным продуктом**, чем конкуренты благодаря AI. Но ключ — использовать **бесплатные/низкобюджетные инструменты** на первый год, фокусируясь на:

| AI Инновация | Для бесплатного | ROI | Для платного (Premium) |
|---|---|---|---|
| **LLM-powered interview assistant** | Dinamic Q&A generation | Улучшает completion rate на 30%+ | Advanced coaching during interview |
| **Emotion & sentiment detection** | Identify key moments automatically | Highlighting + summaries | Emotional journey visualization |
| **Temporal knowledge graphs** | Auto-create life timeline | Reduces manual effort 60% | Relationship mapping + insights |
| **Image-to-story synthesis** | Photo → caption generation | Engagement boost | Family photo album with auto-narration |
| **Voice cloning + video generation** | (Not for free, but tier 2) | — | Legacy video messages (paid) |
| **Semantic search embeddings** | Find memories across interviews | Key moment discovery | AI-powered memory recommendations |
| **Face anonymization (GDPR)** | Auto-anonymize family photos | Trust + compliance | Privacy-first sharing |
| **Personalization engine** | Recommend what to add | Content suggestions | AI-driven question adaptation |

**ФИШКА:** Большинство из этого работает на **FREE tier** или **очень дешево** ($0-50/месяц за MVP).

---

## ЧАСТЬ 1: БЕСПЛАТНЫЕ AI ИНСТРУМЕНТЫ ДЛЯ MVP

### 1.1 LLM для интерактивного интервью (FREE)

#### Стратегия: Используйте Groq или Google Gemini для FREE tier

```
ПРОБЛЕМА:
- Текущий Memory Keeper: 32 статичных вопроса
- Результат: Люди забывают свои лучшие истории, потому что вопросы не персонализированы

РЕШЕНИЕ: LLM-powered interview assistant
- Пользователь отвечает на вопрос
- LLM анализирует ответ
- LLM генерирует персональное follow-up Q&A
- Пример: 
  User: "My best memory was when I travelled to Paris"
  LLM: "That sounds wonderful! How old were you? Who did you go with? What was your favourite part?"

ТЕХНОЛОГИЯ: Google Gemini API (FREE TIER)
├─ 60 RPM (requests per minute)
├─ 1,500 RPD (requests per day)
├─ Up to 1M tokens/minute
└─ Perfect for MVP scale (100-500 users/day)

СТОИМОСТЬ: £0/месяц
ВРЕМЯ РАЗРАБОТКИ: 8-10 часов
ЦЕННОСТЬ: +30-40% увеличение completion rate (люди дают больше деталей)
```

#### Кодовый пример:

```python
import anthropic
# или google.generativeai
# или groq

async def generate_followup_questions(user_answer: str, category: str) -> list[str]:
    """
    Generate personalized follow-up questions based on user's previous answer
    """
    client = anthropic.Anthropic()  # или Groq / Google
    
    prompt = f"""
    User shared this memory: "{user_answer}"
    Category: {category}
    
    Generate 2-3 follow-up questions that:
    1. Go deeper into their story
    2. Extract emotional details
    3. Connect to relationships/values
    
    Format: Return as JSON array of strings
    Keep questions warm, conversational, not clinical
    
    Example: 
    ["Who was with you?", "What feeling do you remember most?", "Why was that moment special?"]
    """
    
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",  # or "gemini-1.5-flash" or "mixtral-8x7b"
        max_tokens=150,
        messages=[{"role": "user", "content": prompt}]
    )
    
    return json.loads(response.content[0].text)
```

#### Бесплатные LLM API (рейтинг по быстродействию и цене для вашего случая):

```
РЕЙТИНГ для Memory Keeper:

1. ⭐⭐⭐ GROQ (https://console.groq.com)
   - Speediest: 300+ tokens/second (vs OpenAI 50-100)
   - Free tier: 14,400 requests/day
   - Models: Llama 3.3 70B, Mixtral 8x7B, etc.
   - Perfect for: Real-time Q&A generation
   - Cost: £0 forever for MVP scale

2. ⭐⭐⭐ Google Gemini API (https://ai.google.dev)
   - Generous: 60 RPM, 1,500 RPD
   - Free tier: 1M tokens/minute
   - Models: Gemini 1.5 Flash, Gemini 2.5
   - Perfect for: Multimodal (text + images)
   - Cost: £0 for 60,000 requests/month

3. ⭐⭐ Mistral API (https://console.mistral.ai)
   - Very fast: 100+ tokens/second
   - Free tier: 100 API calls/minute (with phone verification)
   - Models: Mistral Small, Mistral Large
   - Perfect for: Lightweight tasks
   - Cost: £0 or minimal

4. ⭐⭐ OpenRouter (https://openrouter.ai)
   - Aggregator: Access to 200+ models
   - Free tier: £0 on free credits
   - Can route to Groq, Together AI, etc.
   - Perfect for: Fallback if one API down
   - Cost: Usually cheaper than direct APIs

5. ⭐⭐ Hugging Face Inference API (https://huggingface.co)
   - 150,000+ models
   - Free tier: Limited to smaller models (<10GB)
   - Models: Llama, Mistral, Open Llama
   - Perfect for: Custom/specialized models
   - Cost: £0 (slower) or £9+ for Inference Endpoints
```

#### Рекомендация для MVP:

```
PHASE 1 (Months 1-3): Google Gemini FREE
- Easy to start
- Sufficient for 50-100 users/day
- Upgrade trigger: Hit 1,500 RPD limit

PHASE 2 (Months 4+): Groq + Gemini (hybrid)
- Groq for speed-critical operations (real-time Q&A)
- Gemini for batch operations (email generation)
- Cost: Still £0 at this scale

PHASE 3 (Months 12+): Add Together AI or HyperBolic
- If free tiers exhausted
- Cost: ~£20-50/month
```

---

### 1.2 Sentiment Analysis + Emotion Detection (FREE to £20/месяц)

#### Проблема → Решение:

```
ПРОБЛЕМА:
- Пользователь генерирует 50 историй
- Какие самые важные? Какие самые эмоциональные?
- Текущее решение: Нет (пользователь должен искать сам)

РЕШЕНИЕ: AI-powered emotional tagging
- Для каждого рассказа: определить эмоцию (joy, nostalgia, pride, love, etc.)
- Автоматически выделить "peak moments"
- Suggest: "You told 7 happy stories, 3 bittersweet ones, 2 regretful"
- PDF: Show emotional journey visualization
```

#### Технология: Twinword Emotion Detection API (FREE tier)

```
FREE TIER:
- 9,000 words/month (perfectly sufficient!)
- Detect: joy, anger, sadness, disgust, surprise, fear
- Cost: £0/month
- Speed: Near-instant

PAID (if needed):
- £19/month for 100K words
- Not needed for first year
```

#### Код:

```python
import requests
import json

async def detect_emotion(text: str) -> dict:
    """
    Analyze emotional tone of a memory story
    Using Twinword free API
    """
    api_url = "https://api.twinword.com/api/emotion/analyze"
    headers = {
        "X-Twinword-Token": os.getenv("TWINWORD_API_KEY")
    }
    data = {"text": text}
    
    response = requests.post(api_url, headers=headers, json=data)
    result = response.json()
    
    # Extract emotions
    emotions = result.get("emotions", {})
    dominant_emotion = max(emotions.items(), key=lambda x: x[1])[0]
    
    return {
        "dominant_emotion": dominant_emotion,
        "all_emotions": emotions,
        "emotionality_score": result.get("emotionality_score", 0)
    }

# Usage:
story = "I remember the day my daughter was born. I was so happy I cried..."
emotion = await detect_emotion(story)
# Returns: {
#   "dominant_emotion": "joy",
#   "all_emotions": {"joy": 0.85, "surprise": 0.4, ...},
#   "emotionality_score": 0.92
# }
```

#### Интеграция в Memory Keeper:

```javascript
// Frontend: Show emotion tags on each memory card

<MemoryCard>
  <Title>The day we got married</Title>
  <Text>{memory.text}</Text>
  
  {/* NEW: Emotion visualization */}
  <EmotionBadge emotion={memory.emotion}>
    {memory.emotion.toUpperCase()}
  </EmotionBadge>
  
  {/* Emotional intensity bar */}
  <EmotionIntensity>
    <Bar width={memory.emotionality_score * 100}% />
  </EmotionIntensity>
</MemoryCard>

// PDF Export: Emotional journey
<pdf>
  <h3>Your Emotional Journey</h3>
  <ChartEmotionalTimeline 
    emotions={memories.map(m => m.emotion)}
  />
  {/* Shows: "13 moments of joy, 4 of nostalgia, 2 of pride" */}
</pdf>
```

#### Результат для пользователя:

```
БЕСПЛАТНЫЙ ПРОДУКТ (Memory Keeper):
- 32 guided questions → generate ~20K words
- Each story tagged with emotion
- Dashboard shows: "Your top emotions: Joy (60%), Nostalgia (25%), Pride (15%)"
- PDF includes: Emotional timeline visualization

ЦЕННОСТЬ:
- Identifies peak moments automatically
- Helps family see emotional arc of person's life
- Creates narrative structure (vs random stories)
- "Wow, I didn't realize how much joy my parents had" effect
```

---

### 1.3 Temporal Knowledge Graphs для автоматической хронологии (FREE open-source)

#### Проблема:

```
ТЕКУЩЕЕ:
- User: "I was born in Birmingham"
- User: "I moved to London in 1985"
- User: "I married Susan in 1990"
- Результат: Just text, no timeline structure

НОВОЕ (с Temporal Knowledge Graph):
- System автоматически создаёт timeline
- Relationships: "1985 → move to London" → "1990 → met Susan"
- Visualization: Interactive timeline
- AI insights: "You lived in London 35 years"
```

#### Технология: Neo4j + Graphiti (open-source, £0)

```
STACK:
1. Neo4j (open-source, community edition FREE)
   - Graph database
   - Perfect for relationships + temporal data
   - Can self-host or use Neo4j Aura (free tier: 100K nodes)

2. LLM Entity Extraction (Groq/Gemini — FREE)
   - Extract dates, locations, people from stories
   - Generate temporal relationships

3. Graphiti (open-source)
   - Purpose-built temporal knowledge graph for AI agents
   - Maintains historical relationships
   - Perfect for "memory consolidation"

COST: £0 (open-source)
TIME: 12-15 hours to implement
```

#### Код (упрощённо):

```python
import os
from langchain_community.graphs import Neo4jGraph
from langchain.chains import GraphCypherQAChain
from langchain_openai import ChatOpenAI
import json

# Initialize graph (self-hosted or Neo4j Aura free tier)
graph = Neo4jGraph(
    url=os.getenv("NEO4J_URL"),  # "bolt://localhost:7687" or Neo4j Aura
    username=os.getenv("NEO4J_USERNAME"),
    password=os.getenv("NEO4J_PASSWORD")
)

async def extract_timeline_from_story(story: str, story_id: str) -> dict:
    """
    Extract temporal entities (dates, people, locations, events)
    Create nodes in knowledge graph
    """
    
    # Step 1: Extract entities using LLM (Groq for speed)
    from groq import Groq
    client = Groq(api_key=os.getenv("GROQ_API_KEY"))
    
    extraction_prompt = f"""
    Extract from this memory story:
    1. Key events with dates (e.g., "married in 1990")
    2. People mentioned (e.g., "Susan", "my mother")
    3. Locations (e.g., "London", "Birmingham")
    4. Relationships between entities
    
    Story: {story}
    
    Return as JSON:
    {{
        "events": [
            {{"date": "1990", "event": "Married Susan", "location": "London"}},
            ...
        ],
        "people": ["Susan", "mother", ...],
        "locations": ["London", "Birmingham", ...],
        "relationships": [
            {{"from": "story", "to": "location", "type": "TOOK_PLACE_IN", "date": "1990"}}
        ]
    }}
    """
    
    message = client.messages.create(
        model="mixtral-8x7b-32768",
        max_tokens=500,
        messages=[{"role": "user", "content": extraction_prompt}]
    )
    
    entities = json.loads(message.content[0].text)
    
    # Step 2: Create nodes in Neo4j
    for event in entities.get("events", []):
        graph.query(f"""
            MERGE (story:Story {{id: '{story_id}'}})
            MERGE (event:Event {{name: '{event['event']}', date: '{event.get('date', 'unknown')}'}})
            MERGE (location:Location {{name: '{event.get('location', 'unknown')}'}})
            MERGE (story)-[:CONTAINS]->(event)
            MERGE (event)-[:TOOK_PLACE_IN]->(location)
            SET event.timestamp = timestamp(datetime('{event.get('date')}-01-01T00:00:00'))
        """)
    
    for person in entities.get("people", []):
        graph.query(f"""
            MERGE (person:Person {{name: '{person}'}})
            MERGE (story:Story {{id: '{story_id}'}})
            MERGE (story)-[:MENTIONS]->(person)
        """)
    
    # Step 3: Query timeline
    timeline_query = f"""
        MATCH (story:Story {{id: '{story_id}'}})-[:CONTAINS]->(event:Event)
        RETURN event.name, event.timestamp, event.date
        ORDER BY event.timestamp
    """
    
    timeline = graph.query(timeline_query)
    
    return {
        "entities": entities,
        "timeline": timeline,
        "graph_nodes_created": len(entities.get("events", [])) + len(entities.get("people", []))
    }

# Usage:
story = "I was born in 1950 in Birmingham. In 1968 I moved to London. In 1972 I met my wife Susan..."
result = await extract_timeline_from_story(story, "memory_1")
# Returns: timeline with all events sorted chronologically
```

#### Интеграция в Memory Keeper:

```jsx
// Frontend: Interactive Timeline Visualization

<TimelineVisualization>
  <Timeline
    events={memoryTimeline}
    onEventClick={(event) => showRelatedMemories(event)}
  >
    {/* 1950: Born in Birmingham */}
    {/* 1968: Moved to London */}
    {/* 1972: Met Susan */}
    {/* 1990: Married */}
    {/* 2000: First grandchild */}
  </Timeline>
  
  <RelatedMemories>
    {/* Show all memories that connect to selected event */}
  </RelatedMemories>
</TimelineVisualization>

// PDF: Chronological story
{/* Instead of random order, PDF shows stories in timeline order */}
```

#### Результат:

```
БЕСПЛАТНЫЙ ПРОДУКТ:
- Автоматическая хронологизация 20 историй
- Timeline visualization
- "Your life from 1950-2025 in one glance"
- Related memories grouped by era

ПЛАТНЫЙ ПРОДУКТ (Premium):
- Advanced graph analysis ("Who were you closest to?")
- Multi-generational family tree
- "Life patterns" insights
- Export as interactive timeline website
```

---

### 1.4 Image-to-Story Synthesis (FREE)

#### Проблема:

```
СИТУАЦИЯ:
- Пользователь: "Я хочу добавить фото к истории, но не знаю, как описать"
- OR: "Я добавил 30 фото, но это заняло 2 часа"

РЕШЕНИЕ: AI image description
- Пользователь загружает фото
- AI: "I see a beach with sunset, two people smiling, 1970s style clothing"
- Пользователь расширяет описание + добавляет эмоции
- Автоматически создаётся "photo memory"
```

#### Технология: Google Gemini Vision + Local CLIP embeddings (FREE)

```
ОПТИМАЛЬНЫЙ СТЕК:
1. Gemini 1.5 Flash with Vision (БЕСПЛАТНО)
   - 1,500 requests/day free tier
   - Perfect for 100-500 users

2. Self-hosted CLIP embeddings (БЕСПЛАТНО, open-source)
   - Used for semantic search ("find all beach photos")
   - Runs locally on your server

3. Puter.js OCR (БЕСПЛАТНО)
   - If user uploads handwritten notes with photos
   - Free, unlimited OCR

TOTAL COST: £0
```

#### Код:

```python
import anthropic
import base64
from pathlib import Path

async def analyze_photo_and_generate_caption(image_path: str) -> dict:
    """
    Use Gemini Vision to analyze photo and generate story starter
    """
    
    # Read image
    image_data = base64.standard_b64encode(Path(image_path).read_bytes()).decode("utf-8")
    
    client = anthropic.Anthropic()  # Using Claude for example; Gemini works too
    
    message = client.messages.create(
        model="claude-3-5-sonnet-20241022",  # Can also use gemini-1.5-flash
        max_tokens=300,
        messages=[
            {
                "role": "user",
                "content": [
                    {
                        "type": "image",
                        "source": {
                            "type": "base64",
                            "media_type": "image/jpeg",
                            "data": image_data,
                        },
                    },
                    {
                        "type": "text",
                        "text": """Analyze this photo and generate a warm, nostalgic description that could help someone remember or expand this memory. Include:
1. Visual details (clothing, setting, time period feel)
2. Inferred emotions or mood
3. Suggested story starters ("This reminds me of the time when...")
4. Questions to prompt recall ("Who is in this photo?", "What was happening at this time?")

Keep tone warm and conversational, not clinical."""
                    }
                ],
            }
        ],
    )
    
    description = message.content[0].text
    
    return {
        "caption": description,
        "image_path": image_path,
        "type": "photo_memory"
    }

# Usage:
caption = await analyze_photo_and_generate_caption("grandma_1980s.jpg")
# Returns: Detailed description to seed story
```

#### Интеграция:

```jsx
// Frontend: Photo Upload → Auto Caption

<MemoryPhotoUpload>
  <input type="file" onChange={handlePhotoUpload} />
  
  {/* Show AI-generated caption */}
  {loading && <Spinner />}
  {caption && (
    <>
      <h3>AI-Generated Caption</h3>
      <textarea value={caption} onChange={handleEdit} />
      <p>Edit to personalize, then click "Add to Story"</p>
      <textarea placeholder="Expand the story..." />
    </>
  )}
</MemoryPhotoUpload>
```

#### Результат:

```
БЕСПЛАТНЫЙ ПРОДУКТ:
- Upload photo → get AI description
- Use as story starter
- Reduces friction for adding memories
- Engagement: +25% more photos added

ПЛАТНЫЙ ПРОДУКТ (Premium):
- Photo album with auto-narration
- "Slideshow" mode with generated voiceover
- Multi-photo stories ("That whole summer in 1985")
```

---

### 1.5 Semantic Search Embeddings для поиска по смыслу (FREE)

#### Проблема:

```
ТЕКУЩЕЕ:
- User: "I want to find all my memories about my children"
- Result: Nothing (unless explicitly titled "children")

НОВОЕ:
- Semantic search: "memories about my children"
- Result: All stories mentioning kids, even if words differ
- "my kids", "my daughter", "family moments", etc.
```

#### Технология: Free embedding models + Supabase pgvector (FREE)

```
СТЕК:
1. Sentence Transformers (БЕСПЛАТНО, open-source)
   - Model: "all-MiniLM-L6-v2" (33M params, fast)
   - Runs locally on your server
   - Creates embeddings for each memory

2. Supabase pgvector (БЕСПЛАТНО)
   - Vector search built into PostgreSQL
   - 2GB storage free tier
   - Perfect for 1,000s of memories

3. Chroma.js (БЕСПЛАТНО, optional)
   - Client-side embedding if self-hosting

TOTAL COST: £0
```

#### Код:

```python
from sentence_transformers import SentenceTransformer
from supabase import create_client, Client
import os

# Initialize
model = SentenceTransformer('all-MiniLM-L6-v2')  # 33M params, super fast
supabase: Client = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

async def index_memory_for_search(memory_id: str, text: str) -> None:
    """
    Create embedding for memory and store in Supabase
    """
    
    # Generate embedding
    embedding = model.encode(text).tolist()
    
    # Store in Supabase
    supabase.table("memory_embeddings").insert({
        "memory_id": memory_id,
        "text": text,
        "embedding": embedding  # pgvector stores this
    }).execute()

async def semantic_search(query: str, user_id: str, limit: int = 10) -> list[dict]:
    """
    Search memories by semantic similarity
    """
    
    # Encode query
    query_embedding = model.encode(query).tolist()
    
    # Search using pgvector similarity
    results = supabase.rpc(
        "search_memories",
        {
            "query_embedding": query_embedding,
            "user_id": user_id,
            "match_count": limit
        }
    ).execute()
    
    return results.data

# Usage:
await index_memory_for_search("mem_1", "I remember when my daughter was born...")
results = await semantic_search("memories about children", user_id="user_1")
# Returns: [
#   {"memory_id": "mem_1", "similarity": 0.87, "text": "I remember when my daughter was born..."},
#   {"memory_id": "mem_5", "similarity": 0.82, "text": "My son's first day of school..."},
# ]
```

#### SQL для Supabase:

```sql
-- Create embeddings table with pgvector support
CREATE TABLE memory_embeddings (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  memory_id TEXT NOT NULL,
  text TEXT,
  embedding vector(384),  -- 384 dims for all-MiniLM-L6-v2
  created_at TIMESTAMP DEFAULT NOW()
);

-- Create index for fast similarity search
CREATE INDEX ON memory_embeddings USING ivfflat (embedding vector_cosine_ops)
WITH (lists = 100);

-- Similarity search function
CREATE OR REPLACE FUNCTION search_memories(
  query_embedding vector,
  user_id UUID,
  match_count INT
)
RETURNS TABLE(memory_id TEXT, similarity FLOAT, text TEXT) AS $$
  SELECT
    me.memory_id,
    (1 - (me.embedding <=> query_embedding)) as similarity,
    me.text
  FROM memory_embeddings me
  WHERE me.user_id = $2
  ORDER BY me.embedding <=> query_embedding
  LIMIT match_count;
$$ LANGUAGE SQL;
```

#### Интеграция:

```jsx
// Frontend: Search bar with semantic results

<SearchMemories>
  <input 
    type="text"
    placeholder="Search 'memories about children'..."
    onChange={(e) => semanticSearch(e.target.value)}
  />
  
  <Results>
    {results.map(result => (
      <MemoryCard key={result.memory_id}>
        <Text>{result.text}</Text>
        <Similarity>{Math.round(result.similarity * 100)}% match</Similarity>
      </MemoryCard>
    ))}
  </Results>
</SearchMemories>
```

#### Результат:

```
БЕСПЛАТНЫЙ ПРОДУКТ:
- "Find memories by meaning, not keywords"
- Solves: "I know I told a story about X, but don't remember title"
- Engagement: Users spend more time exploring memories

ПЛАТНЫЙ ПРОДУКТ:
- Advanced filters + saved searches
- AI-generated collections ("5 stories about love")
- Cross-user insights (for families)
```

---

## ЧАСТЬ 2: НИЗКОБЮДЖЕТНЫЕ AI ДЛЯ ПЛАТНОГО (Premium) £20-100/месяц

### 2.1 Многомодальные ответы: Text → Video + Voice (£30-100/месяц)

#### Фишка:

```
БЕСПЛАТНЫЙ ПРОДУКТ:
- Text story with emotion tags + photos

ПЛАТНЫЙ ПРОДУКТ:
- Text + AI-generated video with voiceover
- "Your grandmother speaking to you from the past"
- Emotional, powerful, worth £9.99/месяц alone
```

#### Технология: ElevenLabs Voice Cloning + Descript/Synthesia

```
STACK:
1. ElevenLabs (https://elevenlabs.io)
   - Voice cloning: £10-30/месяц
   - Generate synthetic speech from text
   - Clone user's voice (record 5 mins → use forever)

2. Descript + Synthesia (£20-50/месяц)
   OR simple: MoviePy (БЕСПЛАТНО, open-source)
   - Generate video from text + photos + voiceover
   - Keep it simple: Ken Burns effect on photos

3. Alternatively: Replicate (https://replicate.com)
   - API for open-source video models
   - £0.00015 per video (ОЧЕНЬ дешево)
   - Fast turnover

TOTAL COST: £30-80/месяц for 500-1,000 users
```

#### Код (упрощённо с MoviePy):

```python
from moviepy.editor import *
import elevenlabs

async def create_legacy_video(
    memories: list[dict],
    user_name: str,
    voice_sample_url: str = None
) -> str:
    """
    Create AI video from memories
    Uses ElevenLabs for voice + MoviePy for video
    """
    
    # Step 1: Generate narrative from memories
    narrative = "\n\n".join([m["text"] for m in memories])
    
    # Step 2: Clone voice or use default
    if voice_sample_url:
        # Clone voice using ElevenLabs
        voice_id = await elevenlabs.voice_clone(
            name=f"{user_name}_voice",
            audio_url=voice_sample_url
        )
    else:
        voice_id = "default_warm_voice"  # pre-set voice
    
    # Step 3: Generate speech
    audio = elevenlabs.text_to_speech(
        text=narrative,
        voice_id=voice_id,
        model_id="eleven_monolingual_v1"
    )
    
    # Step 4: Create video
    clips = []
    
    # Title clip
    title_clip = TextClip(
        f"The Story of {user_name}",
        fontsize=70,
        color='white',
        bg_color='black'
    ).set_duration(3)
    clips.append(title_clip)
    
    # Photo clips with Ken Burns effect
    for memory in memories:
        if memory.get("photo_path"):
            photo = ImageClip(memory["photo_path"]).set_duration(5)
            # Ken Burns zoom effect
            photo_zoomed = photo.resize(lambda t: 1 + 0.05*t)
            clips.append(photo_zoomed)
        else:
            # Text card if no photo
            card = TextClip(
                memory["title"],
                fontsize=40,
                color='white',
                bg_color='navy'
            ).set_duration(3)
            clips.append(card)
    
    # Combine clips
    video = concatenate_videoclips(clips)
    
    # Add audio
    audio_clip = AudioFileClip(audio)
    final_video = video.set_audio(audio_clip)
    
    # Save
    output_path = f"/videos/{user_name}_legacy_{int(time.time())}.mp4"
    final_video.write_videofile(output_path, fps=24)
    
    return output_path

# Usage:
video_url = await create_legacy_video(
    memories=[
        {"text": "I was born in 1950...", "title": "Birth"},
        {"text": "I moved to London...", "photo_path": "london.jpg"}
    ],
    user_name="Margaret",
    voice_sample_url="margaret_voice_sample.mp3"
)
# Returns: URL to generated MP4
```

#### Результат:

```
ПЛАТНЫЙ ПРОДУКТ ФИШКА:
- 20-40 min video of their life story
- Narrated in their own voice
- Family watches: Tears, laughter, connection
- Premium pricing: £49/year is STEAL for this
- Upsell from basic: "Want video? Premium"
```

---

### 2.2 Персональная AI память: Memory Consolidation Engine (£20-50/месяц)

#### Проблема:

```
ТЕКУЩЕЕ (Premium):
- User: I have 50 memories, but I want recommendations
- Result: Nothing

НОВОЕ (AI Memory Consolidation):
- System uses Temporal Knowledge Graph (see earlier)
- AI identifies patterns: "You mention your wife Susan in 8 stories"
- AI suggests: "Would you like me to create a 'Susan' tribute?"
- AI consolidates: Creates interconnected narrative
```

#### Технология: Zep (Temporal Knowledge Graph) + LLM

```
КОМБИНАЦИЯ:
1. Zep (https://www.getzep.com)
   - Open-source temporal knowledge graph
   - £0-20/месяц for their managed service
   - OR self-host for free

2. LLM analysis layer (Groq/Gemini)
   - Analyze memory graph
   - Generate insights + recommendations
   - Create consolidated narratives

COST: £20-50/месяц if managed, £0 if self-hosted
```

#### Код:

```python
from zep_python import ZepClient
import anthropic

async def analyze_memory_patterns(user_id: str, memories: list[dict]) -> dict:
    """
    Use Zep to build temporal knowledge graph
    Then LLM analyzes patterns
    """
    
    zep = ZepClient(api_key=os.getenv("ZEP_API_KEY"))
    
    # Step 1: Build graph from memories
    for memory in memories:
        await zep.memory.add(
            session_id=user_id,
            messages=[{
                "role": "assistant",
                "content": memory["text"],
                "metadata": {
                    "date": memory.get("date"),
                    "emotion": memory.get("emotion"),
                    "people": memory.get("people", []),
                    "location": memory.get("location")
                }
            }]
        )
    
    # Step 2: Get consolidated memory
    consolidated = await zep.memory.get(session_id=user_id)
    
    # Step 3: LLM analyzes patterns
    client = anthropic.Anthropic()
    
    analysis_prompt = f"""
    Here is a person's consolidated life memory:
    
    {consolidated.messages}
    
    Analyze and provide:
    1. Top recurring people/relationships
    2. Life themes (e.g., "resilience", "love", "adventure")
    3. Pivotal moments
    4. Relationships & connections
    5. Personal values (inferred from stories)
    
    Return as JSON with insights and recommendations for memory consolidation.
    Example: {{"top_people": ["Susan", "mother"], "themes": ["resilience"], "pivotal_moments": []}}
    """
    
    response = client.messages.create(
        model="claude-3-5-sonnet-20241022",
        max_tokens=500,
        messages=[{"role": "user", "content": analysis_prompt}]
    )
    
    insights = json.loads(response.content[0].text)
    
    return insights

# Usage:
insights = await analyze_memory_patterns(
    user_id="user_1",
    memories=all_user_memories
)
# Returns: {
#   "top_people": ["Susan", "mother", "daughter"],
#   "themes": ["love", "resilience", "travel"],
#   "pivotal_moments": ["marriage", "first child", "retirement"],
#   "recommendations": ["Create Susan tribute", "Travel memories collection"]
# }
```

#### Интеграция:

```jsx
// Premium Dashboard: Memory Insights

<PremiumMemoryInsights>
  <section>
    <h2>Your Life Themes</h2>
    <TagCloud tags={insights.themes} />
  </section>
  
  <section>
    <h2>Most Important People</h2>
    <PersonList people={insights.top_people} />
    {/* Click to see all memories about that person */}
  </section>
  
  <section>
    <h2>Suggested Consolidations</h2>
    {insights.recommendations.map(rec => (
      <RecommendationCard>
        <p>{rec}</p>
        <Button>Create Collection</Button>
      </RecommendationCard>
    ))}
  </section>
</PremiumMemoryInsights>
```

#### Результат:

```
ПЛАТНЫЙ ПРОДУКТ:
- "Understand your life story patterns"
- AI identifies: key people, themes, pivotal moments
- Auto-generates: tribute collections, themed albums
- Pricing: £4.99-9.99/месяц premium add-on

ФИШКА:
- Makes Premium tier STICKIER
- Monthly "memory insights" email
- "Here's what your AI found this month..."
```

---

## ЧАСТЬ 3: АРХИТЕКТУРА ИНТЕГРАЦИИ AI

### 3.1 Минимальная архитектура (Months 1-6)

```
┌─────────────────────────────────────────────────────────────┐
│                     MEMORY KEEPER MVP                       │
└─────────────────────────────────────────────────────────────┘

Frontend (Next.js)
    │
    ├─→ Interview Questions (Guided)
    │       ↓
    ├─→ LLM Follow-ups (Groq/Gemini) ← FREE API
    │       ↓
    ├─→ Emotion Detection (Twinword) ← FREE TIER
    │       ↓
    ├─→ Image Upload → Auto Caption (Gemini Vision) ← FREE
    │       ↓
    ├─→ Store in Supabase + embeddings
    │       ↓
    ├─→ Semantic Search (Local CLIP) ← FREE
    │       ↓
    └─→ PDF Export + Shareable Link

DATABASE:
├─ Supabase PostgreSQL
│   ├─ memories (text, emotion, category)
│   ├─ memory_embeddings (vector search)
│   └─ users
├─ Neo4j Community (timeline graph)
└─ Local file storage (photos)

AI MODELS (running):
├─ Groq/Gemini (API calls, £0)
├─ SentenceTransformers (local, £0)
├─ Twinword API (calls, £0 free tier)
└─ Claude/Gemini Vision (API, £0)

COST: £0-50/месяц
```

### 3.2 Расширенная архитектура (Months 7-12+, для платного)

```
┌─────────────────────────────────────────────────────────────┐
│            MEMORY KEEPER PREMIUM + AI LAYER                 │
└─────────────────────────────────────────────────────────────┘

Everything from MVP + :

AI Services:
├─ ElevenLabs Voice Cloning (£30/месяц)
│   └─→ Generate video + voiceover
├─ Zep Memory Graph (£20-50/месяц) OR self-hosted
│   └─→ Temporal knowledge graph + insights
├─ MoviePy/Synthesia (£0-50/месяц)
│   └─→ Video generation
└─ Advanced Sentiment (paid tier if needed)

Premium Features:
├─ Legacy Video Generation
├─ Memory Consolidation Insights
├─ Advanced Search Filters
├─ Family Sharing + Collaboration
└─ Export Options (Video, Interactive Site)

COST: £50-150/месяц total for 500-2,000 users
```

---

## ЧАСТЬ 4: ЗАТРАТНАЯ МОДЕЛЬ НА МАСШТАБИРОВАНИЕ

### 4.1 Бюджет на 18 месяцев (MVP + Premium)

```
МЕСЯЦЫ 1-3 (MVP без платного):
├─ Hosting: £25 (Supabase free + Vercel free)
├─ Domain: £1
├─ Domain: £1
├─ Development: £0 (your time)
└─ TOTAL: £27/месяц × 3 = £81

МЕСЯЦЫ 4-6 (MVP + Premium prep):
├─ Hosting: £30 (Supabase scales)
├─ Neo4j Cloud: £0 (community free tier) → £20 (if managed)
├─ Video generation (MoviePy): £0
└─ TOTAL: £30-50/месяц × 3 = £90-150

МЕСЯЦЫ 7-12 (Premium active):
├─ Hosting: £40
├─ ElevenLabs: £30 (50+ users generating videos)
├─ Zep managed: £25 (OR £0 self-hosted)
├─ Advanced APIs: £20 (buffer)
└─ TOTAL: £115/месяц × 6 = £690

МЕСЯЦЫ 13-18 (Scale):
├─ Hosting: £75 (more storage/bandwidth)
├─ ElevenLabs: £50 (200+ video generations/месяц)
├─ AI APIs: £50 (Groq paid tier if free exhausted)
├─ Zep: £30
└─ TOTAL: £205/месяц × 6 = £1,230

GRAND TOTAL 18 MONTHS:
£81 + £120 + £690 + £1,230 = £2,121
```

### 4.2 Доход vs. Затраты

```
REVENUE:
Month 6:  10-20 paying users × £75/year = £1,250 revenue (already covers costs!)
Month 12: 60-100 paying users × £75/year = £7,500 revenue
Month 18: 150-200+ paying users × £75/year = £15,000 revenue

MARGINS:
Month 12: £7,500 revenue - £690 costs = £6,810 profit
Month 18: £15,000 revenue - £1,230 costs = £13,770 profit

UNIT ECONOMICS:
CAC (Cost to Acquire): £0-5 (organic channels)
LTV (Lifetime Value): £150-300 (2-4 years)
PAYBACK: < 1 month (because CAC £0-5)
```

---

## ЧАСТЬ 5: ROADMAP ВНЕДРЕНИЯ AI

### Phase 1: Foundation (Months 1-2)

```
WEEK 1: Setup + API Keys
- [ ] Create Groq account (get free API key)
- [ ] Create Google AI Studio account (Gemini API)
- [ ] Create Twinword account (emotion API)
- [ ] Setup Supabase with pgvector
- [ ] Deploy test environment

WEEK 2-3: Build Interview Assistant
- [ ] Implement Groq LLM for follow-up Q&A
- [ ] Test with 5-10 real users
- [ ] Measure: completion rate increase

WEEK 4: Emotion Detection
- [ ] Integrate Twinword API
- [ ] Tag each memory with emotion
- [ ] Build emotion visualization in PDF
- [ ] Test with users
```

### Phase 2: Search + Timeline (Months 3-4)

```
MONTH 3:
- [ ] Implement SentenceTransformers embeddings
- [ ] Setup Supabase pgvector indexing
- [ ] Build semantic search UI
- [ ] Test with 50-100 users

MONTH 4:
- [ ] Setup Neo4j Community (self-hosted)
- [ ] Implement entity extraction (via Groq)
- [ ] Build timeline visualization
- [ ] Test temporal relationships
```

### Phase 3: Image Intelligence (Months 5-6)

```
MONTH 5:
- [ ] Integrate Gemini Vision API
- [ ] Build photo upload + auto-caption
- [ ] Test with users
- [ ] Measure: engagement increase

MONTH 6:
- [ ] Implement CLIP embeddings (local)
- [ ] Build photo search ("find beach photos")
- [ ] Publish Premium tier (pricing page)
- [ ] Prepare for monetization
```

### Phase 4: Premium AI (Months 7-12)

```
MONTHS 7-9:
- [ ] Integrate ElevenLabs voice cloning
- [ ] Build video generation pipeline (MoviePy)
- [ ] Create "Legacy Video" feature
- [ ] Beta with 20-30 premium users

MONTHS 10-12:
- [ ] Scale video generation
- [ ] Integrate Zep for memory consolidation
- [ ] Build AI insights dashboard
- [ ] Launch premium marketing
```

---

## ЧАСТЬ 6: КОНКУРЕНТНЫЕ ПРЕИМУЩЕСТВА ЧЕРЕЗ AI

### vs. MyWishes:

```
MYWAY:
- Static form (20 questions)
- PDF export
- No personalization

MEMORY KEEPER + AI:
✓ Dynamic Q&A (LLM generates follow-ups)
✓ Emotion tagging + visualization
✓ Photo descriptions (AI captions)
✓ Semantic search
✓ Timeline visualization
✓ Video generation (paid)
✓ AI insights + consolidation
= 7x more valuable, same price
```

### vs. StoryTerrace:

```
STORYTERRACE:
- Professional writers (£1,900-16,500)
- Takes months
- Exclusive service

MEMORY KEEPER + AI:
✓ Instant (AI generates within seconds)
✓ £0-75/year (democratized)
✓ Video included (with premium)
✓ Timeline + relationships
✓ Searchable database
= More democratic, faster, cheaper
```

### vs. Generic AI Tools:

```
GENERIC LLM (ChatGPT):
- "Tell me your life story" (vague)
- No structure
- No emotion tracking
- No timeline
- No family integration

MEMORY KEEPER:
✓ Structured interview (32 questions)
✓ AI guides you through emotional beats
✓ Automatic emotion tagging
✓ Auto-generated timeline
✓ Family sharing built-in
✓ Legacy video generation
= Purpose-built, 100x more valuable
```

---

## ЧАСТЬ 7: FREEBIE IDEAS ДЛЯ ВИРУСНОСТИ

### 7.1 "Your Emotional Life in Color" (Free tool)

```
ИДЕЯ:
- User uploads 3-5 memories
- System tags emotions
- Generates beautiful emotional gradient chart
- Shareable image
- Drives traffic + signup

COST: £0 (uses Twinword free tier)
VIRALITY: High ("How did AI find my life emotional arc?")
CONVERSION: 10-15% to full signup
```

### 7.2 "AI Timeline Generator" (Free tool)

```
ИДЕЯ:
- Paste text of your life story
- AI extracts dates + events
- Generates timeline visualization
- Export as SVG
- Share on social

COST: £0 (uses Groq/Gemini free)
VIRALITY: Very high
CONVERSION: 5-10% to Memory Keeper
```

### 7.3 "Which decade was your best?" (Free quiz)

```
ИДЕЯ:
- User submits 3 memories per decade (50s, 60s, 70s, etc.)
- AI analyzes which was happiest/most impactful
- Personalized "Your Golden Decade" report
- Shareable

VIRALITY: Medium-high
CONVERSION: 8-12%
```

---

## ЗАКЛЮЧЕНИЕ: AI как КОМПЕТИТИВНОЕ ПРЕИМУЩЕСТВО

```
СТРАТЕГИЯ:
1. Launch с БЕСПЛАТНЫМИ LLM + emotion + timeline (Months 1-6)
   → Это ALONE выбивает конкурентов
   → Все на free tier (£0/месяц)
   
2. Monetize с VIDEO + INSIGHTS (Months 7-12)
   → Premium features justify £75/year
   → AI consolidation engine makes users sticky
   
3. Scale с advanced personalization (Months 13-18+)
   → Custom recommendations
   → Family collaboration features
   → B2B licensing (care homes)

РЕЗУЛЬТАТ:
- MVP: 6+ AI features (vs 0 у конкурентов)
- Premium: 3+ unique features (video, insights, consolidation)
- CAC: £0-5 (organic, high-quality users)
- LTV: £150-300
- Profitability: Month 12+ (early)

= CLEAR WINNER in dementia/elderly market
```

---

## БЫСТРЫЙ СТАРТ: НЕДЕЛЯ 1

```
ЧТ (День 1):
- [ ] Signup: Groq, Google AI Studio, Twinword
- [ ] Get API keys
- [ ] Create test environment

ПТ-СБ (Дни 2-3):
- [ ] Build Groq LLM integration
- [ ] Test follow-up Q&A generation
- [ ] Build simple test page

ВС-ПН (Дни 4-5):
- [ ] Integrate Twinword emotion API
- [ ] Tag test memories
- [ ] Build emotion visualization

ВТ-СР (Дни 6-7):
- [ ] Setup Supabase pgvector
- [ ] Implement SentenceTransformers
- [ ] Build semantic search
- [ ] Test end-to-end

РЕЗУЛЬТАТ: Working MVP with 4 AI features, ZERO cost
```

---

**Документ завершён. Готов к реализации. Все AI инструменты бесплатны/низкобюджетны.**

**Потенциальный недельный спрос:**
- Phase 1 (Months 1-6): 8-10 часов разработки
- Phase 2 (Months 7-12): 5-8 часов в неделю поддержки
- Phase 3+ (Scale): 3-5 часов в неделю оптимизации

**Выход: Продукт с 7-10 AI features, который конкуренты не могут матчить в цене.**