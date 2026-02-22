(function () {
  const listId = 'leaderboard-list';

  function getSortedPlayers() {
    return [...players].sort((a, b) => (b.points ?? 0) - (a.points ?? 0));
  }

  function renderLeaderboard() {
    const list = document.getElementById(listId);
    if (!list) return;

    const sorted = getSortedPlayers();

    if (sorted.length === 0) {
      list.innerHTML = '<li class="leaderboard-empty">No players yet.</li>';
      return;
    }

    list.innerHTML = sorted
      .map((player, index) => {
        const rank = index + 1;
        const topClass = rank <= 3 ? ` top-${rank}` : '';
        const rankClass = rank <= 3 ? ` top-${rank}` : '';
        return `
          <li class="leaderboard-row${topClass}" role="listitem">
            <span class="rank${rankClass}" aria-label="Rank ${rank}">${rank}</span>
            <div class="player-info">
              <img class="player-avatar" src="${escapeAttr(player.image)}" alt="" width="48" height="48" loading="lazy">
              <span class="player-name">${escapeHtml(player.name)}</span>
            </div>
            <div class="points-wrap">
              <span class="points-value" aria-label="${escapeAttr(String(player.points ?? 0))} points">${escapeHtml(String(player.points ?? 0))}</span>
              <span class="points-label">pts</span>
            </div>
          </li>
        `;
      })
      .join('');
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escapeAttr(str) {
    return escapeHtml(str).replace(/"/g, '&quot;');
  }

  document.addEventListener('DOMContentLoaded', renderLeaderboard);
})();
