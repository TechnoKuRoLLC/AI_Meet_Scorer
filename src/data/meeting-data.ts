export const meetingData = {
  individualAnalysis: [
    {
      speaker: "虎太郎",
      metrics: {
        貢献度: { score: 80, reason: "スキル・経験の共有や将来の展望提示など、議論の軸を提供した。" },
        一貫性: { score: 75, reason: "努力と実績を踏まえた自己評価は一貫していた。" },
        協調性: { score: 40, reason: "熊野ぷ〜さんへの対抗姿勢が強く、対立を助長する発言があった。" },
        脱線度: { score: 35, reason: "途中から雑談や対立が長引き、会議主題から逸れがち。" }, // Inverted for display
        発言密度: { score: 90, reason: "発言量・内容ともに豊富で議論の中心にいた。" },
        ファシリ度: { score: 20, reason: "議事進行や中立的まとめは見られなかった。" },
      },
      meetingStyleAttribute: "自己表現重視（ENFP風）",
      overallScore: 73.3,
    },
    {
      speaker: "熊野ぷ〜さん",
      metrics: {
        貢献度: { score: 45, reason: "自己評価に関する視点提示はあったが、建設的な提案には乏しかった。" },
        一貫性: { score: 60, reason: "自己過大評価を批判する立場は一貫していた。" },
        協調性: { score: 20, reason: "他者を煽るような発言が多く、全体の雰囲気を悪化させた。" },
        脱線度: { score: 20, reason: "主題よりも対人批判に多くの発言を費やしていた。" },
        発言密度: { score: 85, reason: "発言数は非常に多く、議論の一方の中心にいた。" },
        ファシリ度: { score: 10, reason: "ファシリテーションの意識は見られなかった。" },
      },
      meetingStyleAttribute: "批評型（ENTJ風）",
      overallScore: 40.0,
    },
    {
      speaker: "度し難い酷使ローテ伯爵",
      metrics: {
        貢献度: { score: 70, reason: "議論に論理的・客観的視点を織り込んだ。" },
        一貫性: { score: 85, reason: "客観性と論理性を一貫して強調。" },
        協調性: { score: 75, reason: "他者の発言を受けてコメントし、関与度も高かった。" },
        脱線度: { score: 70, reason: "雑談化せず主題内で発言していた。" },
        発言密度: { score: 65, reason: "的確なタイミングで発言。" },
        ファシリ度: { score: 30, reason: "議論収束への小さな貢献があった。" },
      },
      meetingStyleAttribute: "分析重視（INTP風）",
      overallScore: 65.8,
    },
  ],
  teamAnalysis: {
    metrics: {
      目的達成度: { score: 60, reason: "案件評価と単価感覚の共有はあったが、明確な結論や合意は形成されなかった。" },
      議論の建設性: { score: 55, reason: "一部でスキルや提案の共有があったが、個人攻撃的な場面が議論を阻害した。" },
      参加率のバランス: { score: 50, reason: "発言は一部メンバーに集中し、消極的参加者も見られた。" },
      ファシリテーションの機能: { score: 30, reason: "まとめ役が不在で、対立時も整理や収束が行われなかった。" },
      // biome-ignore lint/style/useNamingConvention: <explanation>
      集中度・一貫性: { score: 45, reason: "途中から対立や雑談に脱線し、主題が薄れていった。" },
      チームの雰囲気: { score: 40, reason: "冗談や共感も見られたが、攻撃的な発言が雰囲気を損ねた。" },
      アクション明確度: { score: 20, reason: "ToDoや明確な次のアクションは定義されなかった。" },
    },
    overallScore: 42.9,
  },
} as const
