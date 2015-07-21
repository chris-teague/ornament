module ApplicationHelper

  def render_source(code)
      @html_encoder ||= HTMLEntities.new
      raw(@html_encoder.encode(code))
  end

  def show_code(code)
    toggle_id = Digest::SHA1.hexdigest([Time.now, rand].join)
    code_view = ""
    code_view = "<div class='sg-toggle-code'>"
    code_view += "  <div><span data-toggle-anchor='#{toggle_id}' data-toggle-visible-label='Hide code sample'>View code sample</span></div>"
    code_view += "  <div class='sg-toggle-code-body' data-toggle='#{toggle_id}'><pre class='sg-pre prettyprint'>#{render_source(code)}</pre></div>".html_safe
    code_view += "</div>"
    code_view.html_safe
  end

  # Icon Helper
  # <%= icon("close", width: 24, height: 24, stroke: "#BADA55", fill: "purple") -%>
  def icon(icon_path, options={})
    options[:width] = 24 unless options[:width].present?
    options[:height] = 24 unless options[:height].present?
    options[:stroke] = "#000000" unless options[:stroke].present?
    options[:fill] = "#000000" unless options[:fill].present?
    render("shared/icons/#{icon_path}", options: options)
  end

end
