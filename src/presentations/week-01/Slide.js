function SlideHeading({ slide }) {
  return (
    <div className="week01-heading">
      <h1>{slide.title}</h1>
      {slide.description && <p className="week01-description">{slide.description}</p>}
    </div>
  );
}

const Frame = ({ slide, children }) => <><SlideHeading slide={slide} />{children}</>;

function getExpandedCardIndex(items) {
  if (items.length !== 3) return -1;

  return items.reduce((longest, item, index) => {
    const itemLength = `${item.title ?? ''}${item.text ?? ''}`.replace(/\s/g, '').length;
    const longestLength = `${items[longest].title ?? ''}${items[longest].text ?? ''}`.replace(/\s/g, '').length;
    return itemLength > longestLength ? index : longest;
  }, 0);
}

function adaptiveGridClass(baseClass, items) {
  return `${baseClass} week01-adaptive-cards week01-adaptive-cards--expanded-${getExpandedCardIndex(items)}`;
}

function Cover({ slide }) {
  return (
    <div className="week01-cover-copy">
      <h1>{slide.title}</h1>
      <p className="week01-description">{slide.description}</p>
    </div>
  );
}

function Reason({ slide }) {
  return <Frame slide={slide}><ul className="week01-reason-list">{slide.items.map(item => <li key={item.title}><h2>{item.title}</h2><p>{item.text}</p></li>)}</ul></Frame>;
}

function Record({ slide }) {
  return <Frame slide={slide}><div className="week01-record-table">{slide.groups.map(group => <section key={group.label}><h2>{group.label}</h2><ul>{group.items.map(item => <li key={item}>{item}</li>)}</ul><p>{group.note}</p></section>)}</div></Frame>;
}

function Features({ slide }) {
  return (
    <Frame slide={slide}>
      <div className="week01-mvp-layout">
        {slide.features.map((item, index) => (
          <article key={item.title} className={index === 0 ? 'is-core' : ''}>
            <strong>{item.title}</strong>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </Frame>
  );
}

function Questions({ slide }) {
  return <Frame slide={slide}><ul className="week01-question-list">{slide.questions.map(question => <li key={question}><p>{question}</p><small>논의 필요</small></li>)}</ul><p className="week01-current-idea">{slide.currentIdea}</p></Frame>;
}

function Ai({ slide }) {
  return <Frame slide={slide}><div className="week01-ai-content"><section><h2>추천에 사용할 정보</h2><ul>{slide.input.map(item => <li key={item}>{item}</li>)}</ul></section><section><h2>추천 예시</h2><p>{slide.example}</p><h2 className="week01-ai-subtitle">현재 결정되지 않은 부분</h2><p>{slide.undecided}</p></section></div></Frame>;
}

function Tech({ slide }) {
  return <Frame slide={slide}><div className="week01-tech-table"><div className="week01-tech-head"><span>구분</span><span>기술</span><span>용도</span><span>상태</span></div>{slide.stack.map(item => <div className="week01-tech-row" key={item.area}><span>{item.area}</span><strong>{item.tech}</strong><span>{item.purpose}</span><small>{item.status}</small></div>)}</div><p className="week01-environment">{slide.environment}</p></Frame>;
}

function Next({ slide }) {
  return <Frame slide={slide}><ol className="week01-next-list">{slide.tasks.map(task => <li key={task.number}><span>{task.number}</span><div><h2>{task.title}</h2><p>{task.text}</p></div></li>)}</ol><p className="week01-conclusion">{slide.conclusion}</p></Frame>;
}

function Bullets({ slide }) {
  return <Frame slide={slide}><ul className="week01-bullets">{slide.items.map((item, index) => <li key={index}>{item}</li>)}</ul></Frame>;
}

function Motivation({ slide }) {
  const expandedIndex = getExpandedCardIndex(slide.items);
  return <Frame slide={slide}><ul className={adaptiveGridClass('week01-motivation', slide.items)}>{slide.items.map((item, index) => <li className={index === expandedIndex ? 'is-expanded' : ''} key={item.title}><h2>{item.title}</h2><p>{item.text}</p></li>)}</ul></Frame>;
}

function Recording({ slide }) {
  const cards = [slide.calendar, ...slide.items];
  const expandedIndex = getExpandedCardIndex(cards);

  return <Frame slide={slide}>
    <div className={adaptiveGridClass('week01-recording', cards)}>
      {cards.map((item, index) => <section className={index === expandedIndex ? 'is-expanded' : ''} key={`${item.title}-${index}`}><h2>{item.title}</h2><p>{item.text}</p></section>)}
    </div>
    <p className="week01-category-caption">{slide.categories}</p>
  </Frame>;
}

function Social({ slide }) {
  const expandedIndex = getExpandedCardIndex(slide.items);

  return <Frame slide={slide}>
    <div className={adaptiveGridClass('week01-social', slide.items)}>
      {slide.items.map((item, index) => (
        <section className={index === expandedIndex ? 'is-expanded' : ''} key={`${item.title}-${index}`}>
          <h2>{item.title}</h2>
          <p>{item.text}</p>
        </section>
      ))}
    </div>
  </Frame>;
}

function Stack({ slide }) {
  return <Frame slide={slide}><dl className="week01-stack">{slide.items.map(item => <div key={item.label}><dt>{item.label}</dt><dd><strong>{item.name}</strong><span>{item.detail}</span></dd></div>)}</dl></Frame>;
}

function Recommendation({ slide }) {
  return <Frame slide={slide}>
    <ul className="week01-recommendation-stages">{slide.stages.map(stage => <li key={stage.title}><h2>{stage.title}</h2><p>{stage.text}</p><p className="week01-stage-detail">{stage.detail}</p></li>)}</ul>
    <p className="week01-recommendation-explanation">{slide.explanation}</p>
    <div className="week01-recommendation-plan"><p>{slide.initial}</p><p>{slide.later}</p></div>
  </Frame>;
}

function Roadmap({ slide }) {
  return <Frame slide={slide}><ul className="week01-roadmap">{slide.tasks.map(task => <li key={task.title}><h2>{task.title}</h2><p>{task.text}</p></li>)}</ul></Frame>;
}

function Table({ slide }) {
  const gridStyle = { gridTemplateColumns: `repeat(${slide.columns.length}, minmax(0, 1fr))` };

  return <Frame slide={slide}>
    <div className="week01-flex-table">
      <div className="week01-flex-table-head" style={gridStyle}>
        {slide.columns.map(column => <strong key={column}>{column}</strong>)}
      </div>
      {slide.rows.map((row, rowIndex) => (
        <div className="week01-flex-table-row" style={gridStyle} key={rowIndex}>
          {slide.columns.map((_, columnIndex) => <span key={columnIndex}>{row[columnIndex] ?? ''}</span>)}
        </div>
      ))}
    </div>
  </Frame>;
}

const slideTypes = { motivation: Motivation, recording: Recording, social: Social, stack: Stack, recommendation: Recommendation, roadmap: Roadmap, table: Table, bullets: Bullets, cover: Cover, reason: Reason, record: Record, features: Features, questions: Questions, ai: Ai, tech: Tech, next: Next };

function Slide({ slide }) {
  const Content = slideTypes[slide.type];
  return Content ? <Content slide={slide} /> : <p>지원하지 않는 슬라이드 유형: {slide.type}</p>;
}

export default Slide;
